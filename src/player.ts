import { Card } from './card';

export class Player {
  auto = false;
  cards: Card[];
  constructor(cards: Card[], auto = false, drawCard: ((cards: Card[], cidx: number) => Card)){
    this.auto = auto;
    this.cards = [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length)));
  }

  think(playCard: ((p: Player, cidx: number, autoPlay: boolean) => void), discardCard: ((p: Player, cidx: number, autoPlay: boolean) => void)){
    const preferredCard = this.cards.findIndex(card => card.possibleNumbers[0] && card.possibleNumbers.slice(1).reduce((p, c) => !p && !c, true));
    if(0 <= preferredCard){
      // Still very stupid strategy that if one is hinted, play that
      playCard(this, preferredCard, true);
    }
    else{
      // Dumb strategy to play from rightmost
      playCard(this, this.cards.length-1, true);
    }
  }
}
