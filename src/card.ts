export class Card {
  number = 1;
  color = 1;
  possibleNumbers = (1 << 5) - 1; // Bitfield [0, 32)
  possibleColors = (1 << 5) - 1; // Bitfield [0, 32)
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

  /// Returns whether the hint affected the possibility of the card
  hintNumber(number: number) {
    if(this.number === number){
      this.possibleNumbers &= 1 << number;
      return true;
    }
    else{
      this.possibleNumbers &= ~(1 << number) & 0x1f;
      return true;
    }
    return false;
  }

  /// Returns whether the hint affected the possibility of the card
  hintColor(color: number) {
    if(this.color === color){
      this.possibleColors &= 1 << color;
      return true;
    }
    else{
      this.possibleColors &= ~(1 << color) & 0x1f;
      return true;
    }
    return false;
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

export function cardLetter(index: number) {
  return String.fromCharCode('A'.charCodeAt(0) + index);
}

export function formatCardLetters(indices: number[]) {
  return indices.length === 0 ? "none are" :
        indices.length === 1 ? cardLetter(indices[0]) + " is" :
        indices.reduce((s, c, i) => (i === indices.length - 1 ? s + " and " :
          0 < i ? s + ", " : "") + cardLetter(c), "") + " are";
}