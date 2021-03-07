import { Card } from './card';

function countIf<T>(arr: Array<T>, f: ((t: T) => boolean)): number {
  return arr.reduce((accum, item) => accum + (f(item) ? 1 : 0), 0);
}

export class Player {
  auto = false;
  cards: Card[];
  lastHintedNumber?: { number: number; turn: number };
  lastHintedColor?: { color: number; turn: number };

  constructor(cards: Card[], auto = false, drawCard: ((cards: Card[], cidx: number) => Card)){
    this.auto = auto;
    this.cards = [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length)));
  }

  think(players: Player[],
    playedCards: Card[][],
    tokens: number,
    turn: number,
    playCard: ((p: Player, cidx: number, autoPlay: boolean) => void),
    discardCard: ((p: Player, cidx: number, autoPlay: boolean) => void),
    hintNumber: ((p: Player, cidx: number, autoPlay: boolean) => void))
  {
    const preferredCard = (() => {
      const hintedNumber = this.lastHintedNumber;
      if(hintedNumber){
        // If there was a hint for a number in the last round and there is open place to put a card,
        // assume it was a suggestion to play it.
        const number = hintedNumber.number;
        if(turn - players.length <= hintedNumber.turn &&
          playedCards.find((cards: Card[]) =>
            (number === 0 || cards[number - 1]) && !cards[number]))
        {
          return this.cards.findIndex(card => card.possibleNumbers === (1 << number));
        }
      }
      const hintedColor = this.lastHintedColor;
      if(hintedColor){
        // If there was a hint for only one card in the last round, assume it was a suggestion to
        // play it.
        const hitColors = countIf(this.cards, card => card.color === hintedColor.color);
        if(hitColors === 1 && turn - players.length <= hintedColor.turn)
          return this.cards.findIndex(card => card.color === hintedColor.color);
      }
      return -1;
    })();
    if(0 <= preferredCard){
      playCard(this, preferredCard, true);
    }
    else if(tokens !== 0){
      // Check others' cards to see if I can give a hint.
      for(const player of players){
        if(player === this)
          continue;
        for(const card of player.cards){
          // Hint unhinted 1 for another player
          if(card.number === 0 && card.possibleNumbers === (1 << 5) - 1){
            hintNumber(player, card.number, true);
            return;
          }
        }
      }

      // Dumb strategy to discard from rightmost
      discardCard(this, this.cards.length-1, true);
    }
  }

  hintNumber(number: number, turn: number){
    const affected = [];
    for(let i = 0; i < this.cards.length; i++){
      if(this.cards[i].hintNumber(number))
        affected.push(i);
    }
    this.lastHintedNumber = { number, turn };
    return affected;
  }

  hintColor(color: number, turn: number){
    turn;
    const affected = [];
    for(let i = 0; i < this.cards.length; i++){
      if(this.cards[i].hintColor(color))
        affected.push(i);
    }
    this.lastHintedColor = { color, turn };
    return affected;
  }
}
