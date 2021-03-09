<template>
  <div>
    <label>
      <input type="checkbox" v-model="debugMode">Debug mode
    </label>
  </div>
  <div>User Id: {{userId}}</div>
  <div>
    User Name: <input type="text" v-model="gameState.userName">
    <button @click="setUserName">Set</button>
  </div>
  <div>
    Session id: {{gameState.sessionId}}
    <button @click="newSession">New session</button>
    <button @click="joinSession">Join session</button>
  </div>
  <div>
    Remaining cards ({{gameState.fieldCards.length}})
    <template v-if="debugMode">
      :
      <span v-for="(card, cidx) in gameState.fieldCards" :key="cidx" :class="['card', card.getClass()]">
        {{card.toString() + " "}}
      </span>
    </template>
  </div>
  <div>
    Played cards ({{playedCards.reduce((count, cards) => count + cards.length, 0)}}/25):
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
  <div class="history">
    <ul>
      <template v-for="item in history" :key="item">
        <li>{{item}}</li>
      </template>
    </ul>
  </div>
  <div>
    Tokens: {{tokens}}
  </div>
  <div>
    Strikes: {{strikes}}
  </div>
  <player-compo v-for="(player, idx) in gameState.players"
    :key="idx"
    :idx="idx"
    :player="player"
    :isThisPlayer="!debugMode && gameState.thePlayer === idx"
    :activeTurn="!gameOver && turn === idx"
    :selectedCard="selectedCard"
    @playerAutoClick="player.auto = !player.auto"
    @playerCardClick="(cidx) => playerCardClick(player, cidx)"
    @playCard="(cidx) => playCard(player, cidx)"
    @discardCard="(cidx) => discardCard(player, cidx)"
    @hintNumber="(number) => hintNumber(player, number)"
    @hintColor="(color) => hintColor(player, color)">
  </player-compo>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue';
import PlayerCompo from './PlayerCompo.vue';
import { Card, drawCard, cardLetter, formatCardLetters } from '../card';
import { Player } from '../player';
import { userId, db } from '../main';
import { updateSession, loadSession, saveSessionId, GameState } from '../session';


export default {
  name: 'WebHanabi',
  components: {
    PlayerCompo,
  },

  setup(){
    const history = reactive([] as string[]);
    const gameState = reactive(new GameState());
    gameState.init();
    const playedCards: Card[][] = reactive([...Array(5)].map(() => []));
    const discardedCards: Card[] = reactive([]);
    const selectedCard = ref(-1);
    const globalTurn = ref(0);
    const lastRoundBegin = ref(-1);
    const turn = computed(() => globalTurn.value % gameState.players.length);
    const tokens = ref(8);
    const strikes = ref(0);
    const debugMode = ref(false);
    const gameOver = computed(() => 3 <= strikes.value || playedCards.reduce(
      (pre: boolean, cur: Card[]) => pre && 0 < cur.length && cur[cur.length-1].number === 4, true) ||
      0 <= lastRoundBegin.value && turn.value <= lastRoundBegin.value + gameState.players.length);

    function playerName(player: Player){
      const id = gameState.players.indexOf(player);
      if(id === gameState.thePlayer){
        return "You";
      }
      else{
        return `Player ${id}`;
      }
    }

    function tryNextMove(){
      updateSession(gameState.sessionId, gameState.fieldCards, gameState.players);
      const playerInTurn = gameState.players[turn.value];
      if(playerInTurn.auto && !gameOver.value){
        setTimeout(() => playerInTurn.think(gameState.players, playedCards, tokens.value,
          globalTurn.value, playCard, discardCard, hintNumber), 1000);
      }
    }

    function playerCardClick(player: Player, cidx: number){
      if(turn.value !== gameState.players.indexOf(player)){
        console.log("Hey, it's not your turn!");
        return;
      }
      const card = player.cards[cidx];
      console.log(`You clicked ${card.toString()}`);
      selectedCard.value = cidx;
    }

    function playCard(player: Player, cidx: number, autoPlay = false){
      if(gameOver.value){
        alert("The game is over.");
        return;
      }
      if(turn.value !== gameState.players.indexOf(player) ||
        !autoPlay && (player.auto || turn.value !== gameState.thePlayer)){
        alert("Hey, it's not your turn!");
        return;
      }
      if(cidx < 0){
        alert("Please select a card.");
        return;
      }
      const card = player.cards[cidx];
      player.cards.splice(cidx, 1);
      let striked = false;
      if(playedCards[card.color].length === 0 && card.number !== 0){
        strikes.value++;
        striked = true;
      }
      else if(0 < playedCards[card.color].length && card.number !== playedCards[card.color][playedCards[card.color].length-1].number + 1){
        strikes.value++;
        striked = true;
      }
      else{
        playedCards[card.color].push(card);
      }
      if(striked)
        discardedCards.push(card);

      const drawnCard = drawCard(gameState.fieldCards, Math.floor(Math.random() * gameState.fieldCards.length));
      if(drawnCard)
        player.cards.push(drawnCard);
      else
        lastRoundBegin.value = turn.value;
      globalTurn.value++;
      selectedCard.value = -1;
      history.unshift(`${playerName(player)} played ${cardLetter(cidx)} which is ${card.toString()} and it was ${
        striked ? "a strike" : "ok"}`);
      if(gameOver.value){
        history.unshift(`The game is over! Your score was ${
          playedCards.reduce((pre, cur) => pre + cur.length, 0)}`);
      }
      tryNextMove();
    }

    function discardCard(player: Player, cidx: number, autoPlay = false){
      if(gameOver.value){
        alert("The game is over.");
        return;
      }
      if(turn.value !== gameState.players.indexOf(player) || !autoPlay && player.auto){
        alert("Hey, it's not your turn!");
        return;
      }
      if(cidx < 0){
        alert("Please select a card.");
        return;
      }
      const card = player.cards[cidx];
      player.cards.splice(cidx, 1);
      discardedCards.push(card);
      const drawnCard = drawCard(gameState.fieldCards, Math.floor(Math.random() * gameState.fieldCards.length));
      if(drawnCard)
        player.cards.push(drawnCard);
      else
        lastRoundBegin.value = turn.value;
      globalTurn.value++;
      tokens.value = Math.min(8, tokens.value + 1);
      history.unshift(`${playerName(player)} discarded ${cardLetter(cidx)} which is ${card.toString()}`);
      tryNextMove();
    }

    function hintNumber(player: Player, number: number, autoPlay = false) {
      if(gameOver.value){
        alert("The game is over.");
        return;
      }
      if(!autoPlay && gameState.players[turn.value].auto){
        alert("Hey, it's not your turn!");
        return;
      }
      if(!autoPlay && gameState.players.indexOf(player) === gameState.thePlayer || gameState.players.indexOf(player) === turn.value){
        alert("You can't hint yourself!");
        return;
      }
      if(tokens.value <= 0){
        alert("You used up all tokens!");
        return;
      }
      const affected = player.hintNumber(number, globalTurn.value);
      tokens.value--;
      history.unshift(`${playerName(gameState.players[turn.value])} hinted ${playerName(player)} about ${
        formatCardLetters(affected)
      } number ${number+1}`);
      globalTurn.value++;
      tryNextMove();
    }

    function hintColor(player: Player, color: number, autoPlay = false) {
      if(gameOver.value){
        alert("The game is over.");
        return;
      }
      if(!autoPlay && gameState.players[turn.value].auto){
        alert("Hey, it's not your turn!");
        return;
      }
      if(!autoPlay && gameState.players.indexOf(player) === gameState.thePlayer || gameState.players.indexOf(player) === turn.value){
        alert("You can't hint yourself!");
        return;
      }
      if(tokens.value <= 0){
        alert("You used up all tokens!");
        return;
      }
      const affected = player.hintColor(color, globalTurn.value);
      tokens.value--;
      history.unshift(`${playerName(gameState.players[turn.value])} hinted ${playerName(player)} about ${
        formatCardLetters(affected)
      } color ${Card.prototype.getColor(color)}`);
      globalTurn.value++;
      tryNextMove();
    }

    function setUserName(){
      db.collection("/users").doc(userId).set({name: gameState.userName});
      if(gameState.sessionId && 0 <= gameState.thePlayer){
        gameState.players[gameState.thePlayer].name = gameState.userName;
        updateSession(gameState.sessionId, gameState.fieldCards, gameState.players);
      }
    }

    async function joinSession(){
      const newId = prompt("Enter session id");
      if(!newId)
        return;
      const sessionData = await loadSession(newId);
      gameState.applySession(sessionData);
      gameState.sessionId = newId;
      saveSessionId(newId);
    }

    return {
      history,
      gameState,
      selectedCard,
      turn,
      tokens,
      strikes,
      playedCards,
      discardedCards,
      playerCardClick,
      playCard,
      discardCard,
      hintNumber,
      hintColor,
      debugMode,
      gameOver,
      userId,
      setUserName,
      newSession: () => gameState.newSession(),
      joinSession,
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
  margin: 2px;
}
li {
  text-align: justify;
}
a {
  color: #42b983;
}
.history {
  border: solid 1px #003f3f;
  position: relative;
  height: 6em;
  overflow-y: scroll;
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
