export class Card {
  number = 1;
  color = 1;
  constructor(number: number, color: number) {
    this.number = number;
    this.color = color;
  }

  toString() {
    return `${this.getColor()}${this.number + 1} `;
  }

  getColor(color: number | null = null) {
    color = color ?? this.color;
    switch(color){
      case 0: return "r";
      case 1: return "g";
      case 2: return "b";
      case 3: return "y";
      case 4: return "w";
      case 5: return "x";
      default: return "?";
    }
  }

  getClass() {
    switch(this.color){
      case 0: return "red";
      case 1: return "green";
      case 2: return "blue";
      case 3: return "yellow";
      case 4: return "white";
      case 5: return "rainbow";
      default: return "";
    }
  }
}

export function genCards() {
  const ret: Card[] = [];
  for(let n = 0; n < 5; n++){
    for(let i = 0; i < (n == 0 ? 3 : n < 5 ? 2 : 1); i++){
      for(let c = 0; c < 5; c++){
        ret.push(new Card(n, c));
      }
    }
  }
  return ret;
}

export function drawCard(cards: Card[], index: number) {
  if(index === undefined)
    index = cards.length - 1;
  return cards.splice(index, 1)[0];
}
