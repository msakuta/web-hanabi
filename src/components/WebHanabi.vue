<template>
  <div>
    Remaining cards:
    <span v-for="(card, cidx) in cards" :key="cidx" :class="['card', card.getClass()]">
      {{card.toString()}}
    </span>
  </div>
  <div>
    Played cards:
    <span v-for="(cards, cidx) in playedCards" :key="cidx" :class="['card', cards.length ? cards[0].getClass() : '']">
      {{cards.length ? cards[0].toString() : ''}}
    </span>
  </div>
  <div v-for="(player, idx) in players" :key="idx">
    Player {{idx}}:
    <span v-for="(card, cidx) in player" :key="cidx" :class="['card', card.getClass()]">
      {{card.toString()}}
    </span>
  </div>
</template>

<script lang="ts">

class Card {
  number = 1;
  color = 1;
  constructor(number: number, color: number) {
    this.number = number;
    this.color = color;
  }

  toString() {
    return `${this.getColor()}${this.number + 1} `;
  }

  getColor() {
    switch(this.color){
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

function genCards() {
  const ret: Card[] = [];
  for(let n = 0; n < 5; n++){
    for(let i = 0; i < (n == 0 ? 3 : n < 5 ? 2 : 1); i++){
      for(let c = 0; c < 4; c++){
        ret.push(new Card(n, c));
      }
    }
  }
  return ret;
}

function drawCard(cards: Card[], index: number) {
  if(index === undefined)
    index = cards.length - 1;
  return cards.splice(index, 1)[0];
}

export default {
  name: 'WebHanabi',

  setup(){
    const cards = genCards();
    const playedCards = [...Array(5)].map(() => []);
    const players = [...Array(4)].map(() => [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length))));
    console.log(playedCards)
    return {
      players,
      playedCards,
      cards,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  line-height: 3em;
  padding: 4px;
  margin: 4px;
}
.red {
  background-color: #3f0000;
  border: solid 1px  #af0000;
}
.green {
  background-color: #003f00;
  border: solid 1px  #00af00;
}
.blue {
  background-color: #00003f;
  border: solid 1px  #0000ff;
}
.yellow {
  background-color: #3f3f00;
  border: solid 1px  #ffff00;
}
.white {
  background-color: #3f3f3f;
  border: solid 1px  #ffffff;
}
.outerFrame {
  position: relative;
  left: 320px;
  margin-left: -320px;
  right: 0px;
  width: 640px;
  height: 640px;
  border: solid 1px red;
  background-color: white;
}
.playerFrame {
  border: 1px solid black;
  position: relative;
  width: 640px;
}
.inactive {
  background-color: #afafaf;
}
.cell {
  border: solid 1px black;
  width: 32px;
  height: 32px;
}
.ridge {
  border: ridge 4px;
  border-radius: 4px;
  width: 24px;
  height: 24px;
}
.buttonIcon {
  border: outset 4px;
  border-radius: 4px;
  width: 48px;
  height: 48px;
}
.cellInternalFrame {
  border: solid 2px #ff00ff;
  position: absolute;
  left: 2px;
  top: 2px;
  width: 18px;
  height: 18px;
  pointer-events: none;
}
</style>
