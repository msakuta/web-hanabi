<template>
  <div v-if="enableDebugMode">
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
    <input type="text" ref="sessionUrlInput" v-model="sessionUrl" readonly>
    <button @click="copySessionUrl">Copy URL to clipboard</button>
  </div>
  <p>
    Remaining cards ({{gameState.fieldCards.length}})
    <template v-if="debugMode">
      :
      <span v-for="(card, cidx) in gameState.fieldCards" :key="cidx" :class="['card', card.getClass()]">
        {{card.toString() + " "}}
      </span>
    </template>
  </p>
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
      <template v-for="item in historyReversed" :key="item">
        <li>{{substituteHistory(item)}}</li>
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
    :isSelfPlayer="gameState.thePlayer === idx"
    :debugMode="debugMode"
    :activeTurn="!gameState.gameOver && turn === idx"
    :selectedCard="selectedCard"
    :selectedHintPlayer="selectedHintPlayer === idx"
    @playerAutoClick="togglePlayerAuto(player)"
    @playerCardClick="(cidx) => playerCardClick(player, cidx)"
    @playCard="(cidx) => playCard(player, cidx)"
    @discardCard="(cidx) => discardCard(player, cidx)"
    @selectHint="selectedHintPlayer = idx"
    @doHint="(hidx) => doHint(player, hidx)">
  </player-compo>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue';
import PlayerCompo from './PlayerCompo.vue';
import { Card, drawCard, cardLetter, formatCardLetters } from '../card';
import { Player } from '../player';
import { userId, enableDebugMode } from '../main';
import { GameState } from '../gameState';


export default {
  name: 'WebHanabi',
  components: {
    PlayerCompo,
  },

  setup(){
    const gameState = reactive(new GameState());
    gameState.init();
    const selectedCard = ref(-1);
    const turn = computed(() => gameState.globalTurn % gameState.players.length);
    const debugMode = ref(false);
    const sessionUrl = computed(() => `${document.location.origin}${document.location.pathname}?sessionId=${gameState.sessionId}`);
    const sessionUrlInput = ref(null);
    const selectedHintPlayer = ref(-1);

    let pendingNextMove = false;

    function tryNextMove(noUpdate = false){
      if(!noUpdate)
        gameState.updateSession();
      const playerInTurn = gameState.players[turn.value];

      // Currently, only the host (the first player that has started the session) has the right
      // to play the AI. It means if the host leaves, the AIs won't play.
      // However, if one of the players leave, the game won't continue anyway, so
      // I don't think it's a serious problem.
      // Ideally it should be handled by the server (such as Firebase Functions
      // or AWS lambda), but we're poor!
      if(playerInTurn.auto && !gameState.gameOver && !pendingNextMove && gameState.thePlayer === 0){
        pendingNextMove = true;
        setTimeout(() => {
          // The player could have recreated by update from server while waiting the timeout,
          // so we need to get the instance from player list again.
          const playerInTurn = gameState.players[turn.value];
          playerInTurn.think(gameState,
            gameState.globalTurn, playCard, discardCard, hintNumber);
          pendingNextMove = false;
          // Try setting next even after clearing pendingNextMove flag
          tryNextMove();
        }, 1000);
      }
    }

    gameState.tryNextMove = tryNextMove;

    function playerCardClick(player: Player, cidx: number){
      if(turn.value !== gameState.players.indexOf(player)){
        console.log(`Hey, it's not your turn! turn: ${turn.value}, player: ${
          gameState.players.indexOf(player)}`);
        return;
      }
      selectedCard.value = cidx;
    }

    function checkGameOver(){
      if(gameState.gameOver){
        gameState.history.push(`[${gameState.globalTurn + 1}] The game is over! Your score was ${
          gameState.playedCards.reduce((pre, cur) => pre + cur.length, 0)}`);
        gameState.endDate = Date.now();
      }
    }

    function playCard(player: Player, cidx: number, autoPlay = false){
      if(gameState.gameOver){
        alert("The game is over.");
        return;
      }
      if(turn.value !== gameState.players.indexOf(player) ||
        !autoPlay && (player.auto || turn.value !== gameState.thePlayer))
      {
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
        if(card.number === 4){
          gameState.tokens = Math.min(8, gameState.tokens + 1);
        }
      }
      if(striked)
        gameState.discardedCards.push(card);

      const drawnCard = drawCard(gameState.fieldCards, Math.floor(Math.random() * gameState.fieldCards.length));
      if(drawnCard)
        player.cards.push(drawnCard);
      if(gameState.fieldCards.length === 0 && gameState.lastRoundBegun < 0)
        gameState.lastRoundBegun = gameState.globalTurn;
      gameState.history.push(`[${gameState.globalTurn + 1}] {P${gameState.players.indexOf(player)}} played ${cardLetter(cidx)} which is ${
        card.toString()} and it was ${striked ? "a strike" : "ok"}`);
      gameState.globalTurn++;
      selectedCard.value = -1;
      checkGameOver();
      tryNextMove();
    }

    function discardCard(player: Player, cidx: number, autoPlay = false){
      if(gameState.gameOver){
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
      if(gameState.fieldCards.length === 0 && gameState.lastRoundBegun < 0)
        gameState.lastRoundBegun = gameState.globalTurn;
      gameState.history.push(`[${gameState.globalTurn + 1}] {P${gameState.players.indexOf(player)}} discarded ${cardLetter(cidx)} which is ${card.toString()}`);
      gameState.globalTurn++;
      gameState.tokens = Math.min(8, gameState.tokens + 1);
      checkGameOver();
      tryNextMove();
    }

    function hintNumber(player: Player, number: number, autoPlay = false) {
      if(gameState.gameOver){
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
      gameState.history.push(`[${gameState.globalTurn + 1}] {P${turn.value}} hinted {P${gameState.players.indexOf(player)}} about ${
        formatCardLetters(affected)
      } number ${number+1}`);
      gameState.globalTurn++;
      gameState.tokens--;
      checkGameOver();
      tryNextMove();
    }

    function hintColor(player: Player, color: number, autoPlay = false) {
      if(gameState.gameOver){
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
      gameState.history.push(`[${gameState.globalTurn + 1}] {P${turn.value}} hinted {P${gameState.players.indexOf(player)}} about ${
        formatCardLetters(affected)
      } color ${Card.prototype.getColor(color)}`);
      gameState.globalTurn++;
      gameState.tokens--;
      checkGameOver();
      tryNextMove();
    }

    function substituteHistory(item: string){
      return gameState.players.reduce((ss, player, j) =>
        ss.replaceAll(`{P${j}}`, j === gameState.thePlayer ? "You" : player.name), item);
    }

    function copySessionUrl() {
      const copyText = sessionUrlInput.value as HTMLInputElement | null;
      if(!copyText){
        return;
      }

      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
    }

    return {
      gameState,
      selectedCard,
      turn,
      playerCardClick,
      playCard,
      discardCard,
      doHint: (player: Player, idx: number) => {
        if(gameState.players[selectedHintPlayer.value] === player){
          if(0 <= idx && idx < 5){
            hintNumber(player, idx);
          }
          else if(5 <= idx && idx < 10){
            hintColor(player, idx - 5);
          }
        }
      },
      hintColor,
      enableDebugMode,
      debugMode,
      userId,
      selectedHintPlayer,
      setUserName: () => gameState.setUserName(),
      togglePlayerAuto: (player: Player) => {
        player.auto = !player.auto;
        tryNextMove();
      },
      newSession: () => gameState.newSession(),
      joinSession: () => gameState.joinSession(),
      historyReversed: computed(() => {
        const copy = gameState.history.slice();
        copy.reverse();
        return copy;
      }),
      substituteHistory,
      sessionUrl,
      sessionUrlInput,
      copySessionUrl,
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
  height: 10em;
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
