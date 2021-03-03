import { Card } from './card';

export class Player {
  auto = false;
  cards: Card[];
  constructor(cards: Card[], auto = false, drawCard: ((cards: Card[], cidx: number) => Card)){
    this.auto = auto;
    this.cards = [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length)));
  }

  think(players: Player[],
    playCard: ((p: Player, cidx: number, autoPlay: boolean) => void),
    discardCard: ((p: Player, cidx: number, autoPlay: boolean) => void),
    hintNumber: ((p: Player, cidx: number, autoPlay: boolean) => void))
  {
    const preferredCard = this.cards.findIndex(card => card.possibleNumbers[0] && card.possibleNumbers.slice(1).reduce((p, c) => !p && !c, true));
    if(0 <= preferredCard){
      // Still very stupid strategy that if one is hinted, play that
      playCard(this, preferredCard, true);
    }
    else{
      // Check others' cards to see if I can give a hint.
      for(const player of players){
        if(player === this)
          continue;
        for(const card of player.cards){
          // Hint unhinted 1 for another player
          if(card.number === 0 && card.possibleNumbers.reduce((p, c) => p && c, true)){
            hintNumber(player, card.number, true);
            return;
          }
        }
      }

      // Dumb strategy to discard from rightmost
      discardCard(this, this.cards.length-1, true);
    }
  }
}
