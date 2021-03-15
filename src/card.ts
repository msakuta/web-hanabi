export class Card {
  number = 1;
  color = 1;
  possibleNumbers = (1 << 5) - 1; // Bitfield [0, 32)
  possibleColors = (1 << 5) - 1; // Bitfield [0, 32)
  constructor(number = 0, color = 0) {
    this.number = number;
    this.color = color;
  }

  toString() {
    return `${this.getColor()}${this.number + 1}`;
  }

  serialize() {
    // We encode the card state to compact string because this is a "leaf" of the
    // data structure.
    // Technically, possible numbers and colors could be reconstructed from hint
    // history, but it's tedious to accumulate all the history and make sure it
    // is consistent, so we just embed that information to serialized string.
    return this.toString() + `:${this.possibleNumbers}:${this.possibleColors}`;
  }

  deserialize(s: string) {
    this.color = fromColor(s[0]);
    this.number = s[1].charCodeAt(0) - "1".charCodeAt(0);
    const splits = s.substr(3).split(":");
    if(0 < splits.length)
      this.possibleNumbers = parseInt(splits[0]);
    if(1 < splits.length)
      this.possibleColors = parseInt(splits[1]);
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
    return getClass(this.color);
  }

  /// Returns whether the hint affected the possibility of the card
  hintNumber(number: number) {
    if(this.number === number){
      this.possibleNumbers &= 1 << number;
      return true;
    }
    else{
      this.possibleNumbers &= ~(1 << number) & 0x1f;
      return false;
    }
  }

  /// Returns whether the hint affected the possibility of the card
  hintColor(color: number) {
    if(this.color === color){
      this.possibleColors &= 1 << color;
      return true;
    }
    else{
      this.possibleColors &= ~(1 << color) & 0x1f;
      return false;
    }
  }
}

export function genCards() {
  const ret: Card[] = [];
  for(let n = 0; n < 5; n++){
    for(let i = 0; i < (n == 0 ? 3 : n < 4 ? 2 : 1); i++){
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

function fromColor(color: string): number {
  switch(color){
    case "r": return 0;
    case "g": return 1;
    case "b": return 2;
    case "y": return 3;
    case "w": return 4;
    case "x": return 5;
    default: return -1;
  }
}

export function getClass(color: number) {
  switch(color){
    case 0: return "red";
    case 1: return "green";
    case 2: return "blue";
    case 3: return "yellow";
    case 4: return "white";
    case 5: return "rainbow";
    default: return "";
  }
}

