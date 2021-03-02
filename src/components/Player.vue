<template>
  <div :class="['frame', activeTurn ? 'activeFrame' : 'inactiveFrame']">
    {{activeTurn ? "* " : "  "}} Player {{idx}}:
    <span style="position: relative; display: inline-block; left: 0; top: 0; width: 25em; height: 5em;">
      <span v-for="(card, cidx) in cards"
        :key="cidx"
        :class="['card', isThisPlayer ? 'hidden' : card.getClass(), activeTurn && cidx === selectedCard ? 'selected' : '']"
        :style="`left: ${cidx * 5}em;`"
        @click="playerCardClick(cidx)">
        {{isThisPlayer ? "&nbsp;&nbsp;" : card.toString()}}
      </span>
    </span>
    <button @click="playCard(selectedCard)">Play</button>
    <button @click="discardCard(selectedCard)">Discard</button>
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
import { Card } from '../card';

type Props = {
  idx: number;
  isThisPlayer: boolean;
  cards: Card[];
  selectedCard: number;
  activeTurn: boolean;
};

export default {
  name: 'Player',
  props: {
    idx: Number,
    isThisPlayer: Boolean,
    cards: Array,
    selectedCard: Number,
    activeTurn: Boolean,
  },

  setup(props: Props, context: SetupContext){
    return {
      playerCardClick: (idx: number) => context.emit("playerCardClick", idx),
      playCard: (idx: number) => context.emit("playCard", idx),
      discardCard: (idx: number) => context.emit("discardCard", idx),
    }
  },
}
</script>

<style scoped>
.card {
  position: absolute;
  line-height: 3em;
  left: 0;
  width: 3em;
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
.frame {
  left: 0;
  width: 38em;
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
</style>
