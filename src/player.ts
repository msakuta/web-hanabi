import { Card } from './card';
import { GameState } from './session';

function countIf<T>(arr: Array<T>, f: ((t: T) => boolean)): number {
  return arr.reduce((accum, item) => accum + (f(item) ? 1 : 0), 0);
}

interface SerializedPlayer {
  name: string;
  playerId?: string;
  auto: boolean;
  cards: string[];
  lastHintedNumber?: { number: number; turn: number };
  lastHintedColor?: { color: number; turn: number };
}

export class Player {
  name = "";
  playerId?: string;
  auto = false;
  cards: Card[];
  lastHintedNumber?: { number: number; turn: number };
  lastHintedColor?: { color: number; turn: number };


  constructor(name: string, cards: Card[], auto = false, drawCard?: ((cards: Card[], cidx: number) => Card)){
    this.name = name;
    this.auto = auto;
    this.cards = drawCard ?
      [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length))) : [];
  }

  serialize(): SerializedPlayer {
    const ret: SerializedPlayer = {
      name: this.name,
      auto: this.auto,
      cards: this.cards.map(card => card.serialize()),
    };
    if(this.playerId)
      ret.playerId = this.playerId;
    if(this.lastHintedNumber)
      ret.lastHintedNumber = this.lastHintedNumber;
    if(this.lastHintedColor)
      ret.lastHintedColor = this.lastHintedColor;
    return ret;
  }

  deserialize(data: SerializedPlayer) {
    this.name = data.name;
    this.playerId = data.playerId;
    this.auto = data.auto;
    this.cards = data.cards.map(data => {
      const card = new Card;
      card.deserialize(data);
      return card;
    })
    this.lastHintedNumber = data.lastHintedNumber;
    this.lastHintedColor = data.lastHintedColor;
  }

  think(gameState: GameState,
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
        if(gameState.globalTurn - gameState.players.length <= hintedNumber.turn &&
          gameState.playedCards.find((cards: Card[]) =>
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
        if(hitColors === 1 && gameState.globalTurn - gameState.players.length <= hintedColor.turn)
          return this.cards.findIndex(card => card.color === hintedColor.color);
      }
      return -1;
    })();
    if(0 <= preferredCard){
      playCard(this, preferredCard, true);
    }
    else if(gameState.tokens !== 0){
      const openNumbers = [...Array(5)].map((_, number) => number)
        .filter(number => !!gameState.playedCards.find((cards: Card[]) =>
          (number === 0 || cards[number - 1]) && !cards[number]));

      // Check others' cards to see if I can give a hint.
      for(const player of gameState.players){
        if(player === this)
          continue;
        // Hint unhinted open number for another player
        for(const number of openNumbers){
          let numPlayableCards = 0;
          let numHintableCards = 0;
          for(const card of player.cards){
            if(card.number === number)
              numHintableCards++;
            if(card.number === number && card.possibleNumbers !== (1 << number) &&
              gameState.playedCards.find((cards: Card[], color) =>
                (number === 0 || cards[number - 1]) && !cards[number] && color === card.color))
            {
              numPlayableCards++;
            }
          }

          // Give the hint only if all the hinted cards are okay to play
          if(0 < numHintableCards && numPlayableCards === numHintableCards){
            hintNumber(player, number, true);
            return;
          }
        }
      }
    }

    // Nothing useful to do. Dumb strategy to discard from rightmost
    discardCard(this, this.cards.length-1, true);
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
