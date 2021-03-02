<template>
  <label>
    <input type="checkbox" v-model="debugMode">Debug mode
  </label>
  <div v-if="debugMode">
    Remaining cards:
    <span v-for="(card, cidx) in cards" :key="cidx" :class="['card', card.getClass()]">
      {{card.toString()}}
    </span>
  </div>
  <div>
    Played cards:
    <span v-for="(cards, cidx) in playedCards" :key="cidx" :class="['card', cards.length ? cards[cards.length-1].getClass() : '']">
      {{cards.length ? cards[cards.length-1].toString() : ''}}
    </span>
  </div>
  <div>
    Discarded cards:
    <span v-for="(card, cidx) in discardedCards" :key="cidx" :class="['card', card.getClass()]">
      {{card.toString()}}
    </span>
  </div>
  <div>
    Tokens: {{tokens}}
  </div>
  <div>
    Strikes: {{strikes}}
  </div>
  <player v-for="(player, idx) in players"
    :key="idx"
    :idx="idx"
    :cards="player"
    :isThisPlayer="!debugMode && thePlayer === idx"
    :activeTurn="turn === idx"
    :selectedCard="selectedCard"
    @playerCardClick="(cidx) => playerCardClick(player, cidx)"
    @playCard="(cidx) => playCard(player, cidx)"
    @discardCard="(cidx) => discardCard(player, cidx)"
    @hintNumber="(number) => hintNumber(player, number)"
    @hintColor="(color) => hintColor(player, color)">
  </player>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import Player from './Player.vue';
import { Card, genCards, drawCard } from '../card';


export default {
  name: 'WebHanabi',
  components: {
    Player,
  },

  setup(){
    const cards = genCards();
    const thePlayer = ref(0);
    const playedCards: Card[][] = reactive([...Array(5)].map(() => []));
    const discardedCards: Card[] = reactive([]);
    const players = reactive([...Array(4)].map(() => [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length)))));
    const selectedCard = ref(-1);
    const turn = ref(0);
    const tokens = ref(8);
    const strikes = ref(0);
    const debugMode = ref(false);
    console.log(playedCards)

    function playerCardClick(player: Card[], cidx: number){
      if(turn.value !== players.indexOf(player)){
        console.log("Hey, it's not your turn!");
        return;
      }
      const card = player[cidx];
      console.log(`You clicked ${card.toString()}`);
      selectedCard.value = cidx;
    }

    function playCard(player: Card[], cidx: number){
      if(turn.value !== players.indexOf(player)){
        alert("Hey, it's not your turn!");
        return;
      }
      if(cidx < 0){
        alert("Please select a card.");
        return;
      }
      const card = player[cidx];
      player.splice(cidx, 1);
      if(playedCards[card.color].length === 0 && card.number !== 0){
        strikes.value++;
      }
      else if(0 < playedCards[card.color].length && card.number !== playedCards[card.color][playedCards[card.color].length-1].number + 1){
        strikes.value++;
      }
      else{
        playedCards[card.color].push(card);
      }
      player.push(drawCard(cards, Math.floor(Math.random() * cards.length)));
      turn.value = (turn.value + 1) % players.length;
      selectedCard.value = -1;
    }

    function discardCard(player: Card[], cidx: number){
     if(turn.value !== players.indexOf(player)){
        alert("Hey, it's not your turn!");
        return;
      }
      if(cidx < 0){
        alert("Please select a card.");
        return;
      }
      const card = player[cidx];
      player.splice(cidx, 1);
      discardedCards.push(card);
      player.push(drawCard(cards, Math.floor(Math.random() * cards.length)));
      turn.value = (turn.value + 1) % players.length;
      tokens.value = Math.min(8, tokens.value + 1);
    }

    function hintNumber(player: Card[], number: number) {
      if(players.indexOf(player) === thePlayer.value){
        alert("You can't hint yourself!");
        return;
      }
      if(tokens.value <= 0){
        alert("You used up all tokens!");
        return;
      }
      for(let i = 0; i < player.length; i++){
        player[i].hintNumber(number);
      }
      tokens.value--;
      turn.value = (turn.value + 1) % players.length;
    }

    function hintColor(player: Card[], color: number) {
      if(players.indexOf(player) === thePlayer.value){
        alert("You can't hint yourself!");
        return;
      }
      if(tokens.value <= 0){
        alert("You used up all tokens!");
        return;
      }
      for(let i = 0; i < player.length; i++){
        player[i].hintColor(color);
      }
      tokens.value--;
      turn.value = (turn.value + 1) % players.length;
    }

    return {
      thePlayer,
      players,
      selectedCard,
      turn,
      tokens,
      strikes,
      playedCards,
      discardedCards,
      cards,
      playerCardClick,
      playCard,
      discardCard,
      hintNumber,
      hintColor,
      debugMode,
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
.hidden {
  background-color: #1f1f1f;
  border: solid 1px  #7f7f7f;
}
.selected {
  border-width: 3px;
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
