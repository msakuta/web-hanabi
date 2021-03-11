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
    Played cards ({{gameState.playedCards.reduce((count, cards) => count + cards.length, 0)}}/25):
    <span v-for="(cards, cidx) in gameState.playedCards" :key="cidx" :class="['card', cards.length ? cards[cards.length-1].getClass() : '']">
      {{cards.length ? cards[cards.length-1].toString() : ''}}
    </span>
  </div>
  <div>
    Discarded cards:
    <span v-for="(card, cidx) in gameState.discardedCards" :key="cidx" :class="['card', card.getClass()]">
      {{card.toString()}}
    </span>
  </div>
  <div class="history">
    <ul>
      <template v-for="item in gameState.history" :key="item">
        <li>{{item}}</li>
      </template>
    </ul>
  </div>
  <div>
    Tokens: {{gameState.tokens}}
  </div>
  <div>
    Strikes: {{gameState.strikes}}
  </div>
  <player-compo v-for="(player, idx) in gameState.players"
    :key="idx"
    :idx="idx"
    :player="player"
    :isThisPlayer="!debugMode && gameState.thePlayer === idx"
    :activeTurn="!gameOver && turn === idx"
    :selectedCard="selectedCard"
    @playerAutoClick="togglePlayerAuto(player)"
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
import { GameState } from '../session';


export default {
  name: 'WebHanabi',
  components: {
    PlayerCompo,
  },

  setup(){
    const gameState = reactive(new GameState());
    gameState.init();
    const selectedCard = ref(-1);
    const lastRoundBegin = ref(-1);
    const turn = computed(() => gameState.globalTurn % gameState.players.length);
    const debugMode = ref(false);
    const gameOver = computed(() => 3 <= gameState.strikes || gameState.playedCards.reduce(
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

    let pendingNextMove = false;

    function tryNextMove(){
      gameState.updateSession();
      const playerInTurn = gameState.players[turn.value];
      if(playerInTurn.auto && !gameOver.value && !pendingNextMove){
        setTimeout(() => {
          // The player could have recreated by update from server while waiting the timeout,
          // so we need to get the instance from player list again.
          const playerInTurn = gameState.players[turn.value];
          playerInTurn.think(gameState.players, gameState.playedCards, gameState.tokens,
            gameState.globalTurn, playCard, discardCard, hintNumber);
          pendingNextMove = false;
          // Try setting next even after clearing pendingNextMove flag
          tryNextMove();
        }, 1000);
        pendingNextMove = true;
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
      if(gameState.playedCards[card.color].length === 0 && card.number !== 0){
        gameState.strikes++;
        striked = true;
      }
      else if(0 < gameState.playedCards[card.color].length && card.number !== gameState.playedCards[card.color][gameState.playedCards[card.color].length-1].number + 1){
        gameState.strikes++;
        striked = true;
      }
      else{
        gameState.playedCards[card.color].push(card);
      }
      if(striked)
        gameState.discardedCards.push(card);

      const drawnCard = drawCard(gameState.fieldCards, Math.floor(Math.random() * gameState.fieldCards.length));
      if(drawnCard)
        player.cards.push(drawnCard);
      else
        lastRoundBegin.value = turn.value;
      gameState.globalTurn++;
      selectedCard.value = -1;
      gameState.history.unshift(`${playerName(player)} played ${cardLetter(cidx)} which is ${card.toString()} and it was ${
        striked ? "a strike" : "ok"}`);
      if(gameOver.value){
        gameState.history.unshift(`The game is over! Your score was ${
          gameState.playedCards.reduce((pre, cur) => pre + cur.length, 0)}`);
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
      gameState.discardedCards.push(card);
      const drawnCard = drawCard(gameState.fieldCards, Math.floor(Math.random() * gameState.fieldCards.length));
      if(drawnCard)
        player.cards.push(drawnCard);
      else
        lastRoundBegin.value = turn.value;
      gameState.globalTurn++;
      gameState.tokens = Math.min(8, gameState.tokens + 1);
      gameState.history.unshift(`${playerName(player)} discarded ${cardLetter(cidx)} which is ${card.toString()}`);
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
      if(gameState.tokens <= 0){
        alert("You used up all tokens!");
        return;
      }
      const affected = player.hintNumber(number, gameState.globalTurn);
      gameState.tokens--;
      gameState.history.unshift(`${playerName(gameState.players[turn.value])} hinted ${playerName(player)} about ${
        formatCardLetters(affected)
      } number ${number+1}`);
      gameState.globalTurn++;
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
      if(gameState.tokens <= 0){
        alert("You used up all tokens!");
        return;
      }
      const affected = player.hintColor(color, gameState.globalTurn);
      gameState.tokens--;
      gameState.history.unshift(`${playerName(gameState.players[turn.value])} hinted ${playerName(player)} about ${
        formatCardLetters(affected)
      } color ${Card.prototype.getColor(color)}`);
      gameState.globalTurn++;
      tryNextMove();
    }

    function setUserName(){
      db.collection("/users").doc(userId).set({name: gameState.userName});
      if(gameState.sessionId && 0 <= gameState.thePlayer){
        gameState.players[gameState.thePlayer].name = gameState.userName;
        gameState.updateSession();
      }
    }

    return {
      gameState,
      selectedCard,
      turn,
      playerCardClick,
      playCard,
      discardCard,
      hintNumber,
      hintColor,
      debugMode,
      gameOver,
      userId,
      setUserName,
      togglePlayerAuto: (player: Player) => {
        player.auto = !player.auto;
        tryNextMove();
      },
      newSession: () => gameState.newSession(),
      joinSession: () => gameState.joinSession(),
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
