<template>
  <div :class="['frame', activeTurn ? 'activeFrame' : 'inactiveFrame']">
    <span style="position: absolute; left: 0; right: 0; width: 8em; height: 5em">
      <div>
        {{activeTurn ? "* " : "  "}} Player {{idx}}:
      </div>
      <label>
        <input type="checkbox" :checked="player.auto" @click="playerAutoClick">Auto
      </label>
    </span>
    <span style="position: absolute; left: 8em; top: 0; width: 20em; height: 5em;">
      <span v-for="(card, cidx) in player.cards"
        :key="cidx"
        :class="['card', 'noselect', isThisPlayer ? 'hidden' : card.getClass(), activeTurn && cidx === selectedCard ? 'selected' : '']"
        :style="`left: ${cidx * 5}em;`"
        @click="playerCardClick(cidx)">
        <div style="font-size: +2; font-weight: bold;">
          {{isThisPlayer ? "??" : card.toString()}}
        </div>
        <span v-for="j in Array(5).fill().map((_, i)=>i)"
          :key="j"
          :class="card.possibleNumbers[j] ? '' : 'notPossible'"
          :style="`left: ${j * 5 + 1}px;`">
          {{j + 1}}
        </span>
        <br>
        <span v-for="j in Array(5).fill().map((_, i)=>i)"
          :key="j"
          :class="card.possibleColors[j] ? '' : 'notPossible'"
          :style="`left: ${j * 5 + 1}px;`">
          {{getColor(j)}}
        </span>
      </span>
    </span>
    <div style="position: absolute; left: 28em; width: 5em; height: 3em;">
      <button @click="playCard(selectedCard)">Play</button>
      <button @click="discardCard(selectedCard)">Discard</button>
    </div>
    <div style="position: absolute; left: 8em; top: 5em; width: 20em; height: 2em">
      Hint:
      <button v-for="i in Array(5).fill().map((_,i)=>i)"
        :key="i"
        @click="hintNumber(i)">
        {{i + 1}}
      </button>
      <button v-for="i in Array(5).fill().map((_,i)=>i)"
        :key="i"
        @click="hintColor(i)">
        {{getColor(i)}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
import { Card, drawCard } from '../card';

export class Player {
  auto = false;
  cards: Card[];
  constructor(cards: Card[], auto = false){
    this.auto = auto;
    this.cards = [...Array(4)].map(() => drawCard(cards, Math.floor(Math.random() * cards.length)));
  }
}

type Props = {
  idx: number;
  isThisPlayer: boolean;
  player: Player;
  selectedCard: number;
  activeTurn: boolean;
};

export default {
  name: 'Player ',
  props: {
    idx: Number,
    isThisPlayer: Boolean,
    player: Object,
    selectedCard: Number,
    activeTurn: Boolean,
  },

  setup(props: Props, context: SetupContext){
    return {
      playerAutoClick: () => context.emit("playerAutoClick"),
      playerCardClick: (idx: number) => context.emit("playerCardClick", idx),
      playCard: (idx: number) => context.emit("playCard", idx),
      discardCard: (idx: number) => context.emit("discardCard", idx),
      getColor: (i: number) => Card.prototype.getColor(i),
      hintNumber: (idx: number) => context.emit("hintNumber", idx),
      hintColor: (idx: number) => context.emit("hintColor", idx),
    }
  },
}
</script>

<style scoped>
.card {
  line-height: 1.2em;
  position: absolute;
  left: 0;
  width: 3em;
  padding: 4px;
  margin: 4px;
  font-family: 'Courier New', Courier, monospace;
}
/* Class that prevents text selection by mouse dragging.
  The style is not defined by standard, so we'd write down browser-dependent styles for major browsers.
  Support by IE11 is somewhat incomplete since Ctrl+A selects the text in elements even with this style. */
.noselect{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* IE/Edge */
  user-select: none;           /* non-prefixed version, currently
                  not supported by any browser */
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
.frame {
  position: relative;
  line-height: 3em;
  left: 0;
  width: 35em;
  height: 7em;
  padding: 4px;
  margin: 4px;
}
.activeFrame {
  border: solid 1px #3f4f4f;
  background-color: #0f2f2f;
}
.inactiveFrame {
  border: solid 1px #1f2f2f;
  background-color: #001f1f;
}
.notPossible {
  color: #1c1e2f
}
</style>
