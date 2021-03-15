<template>
  <div :class="['frame', activeTurn ? 'activeFrame' : 'inactiveFrame']">
    <span style="position: absolute; left: 0; right: 0; width: 8em; height: 5em">
      <div :class="isSelfPlayer ? 'selfBorder' : ''">
        {{activeTurn ? "* " : "  "}} {{player.name}}:
      </div>
      <label>
        <input type="checkbox" :checked="player.auto" @click="playerAutoClick">Auto
      </label>
    </span>
    <span style="position: absolute; left: 8em; top: 0; width: 20em; height: 5em;">
      <span v-for="(card, cidx) in player.cards"
        :key="cidx"
        :class="['card', 'noselect', !debugMode && isSelfPlayer ? 'hidden' : card.getClass(), activeTurn && cidx === selectedCard ? 'selected' : '']"
        :style="`left: ${cidx * 5}em;`"
        @click="playerCardClick(cidx)">
        <div style="font-size: +2; font-weight: bold;">
          <span class="cardLetter">
            {{cardLetter(cidx)}}: 
          </span>
          {{!debugMode && isSelfPlayer ? "??" : card.toString()}}
        </div>
        <span v-for="j in Array(5).fill().map((_, i)=>i)"
          :key="j"
          :class="cardNumberHintClass(card, j)"
          :style="`left: ${j * 5 + 1}px;`">
          {{j + 1}}
        </span>
        <br>
        <span v-for="j in Array(5).fill().map((_, i)=>i)"
          :key="j"
          :class="cardColorHintClass(card, j)"
          :style="`left: ${j * 5 + 1}px;`">
          {{getColor(j)}}
        </span>
      </span>
    </span>
    <div
      v-if="debugMode || isSelfPlayer"
      style="position: absolute; left: 28em; width: 5em; height: 3em;">
      <button @click="playCard(selectedCard)">Play</button>
      <button @click="discardCard(selectedCard)">Discard</button>
    </div>
    <div
      v-if="debugMode || !isSelfPlayer"
      style="position: absolute; left: 3em; top: 5em; width: 30em; height: 2em">
      <span :class="['noselect', 'hintButton', selectedHintPlayer ? 'hintButtonActive' : '']" @click="doHint">
        Hint
      </span>
      <template v-for="i in Array(5).fill().map((_,i)=>i)"
        :key="i">
        <span
          :class="['noselect', 'hintSelectButton', selectedHintPlayer && i === selectedHint ? 'hintSelected' : '']"
          @click="selectHint(i)">
          {{i + 1}}
        </span>
      </template>
      <template v-for="i in Array(5).fill().map((_,i)=>i)"
        :key="i">
        <span
          :class="['noselect', getClass(i), 'hintSelectButton',
            selectedHintPlayer && i + 5 === selectedHint ? 'hintSelected' : '']"
          @click="selectHint(i + 5)">
          {{getColor(i)}}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext, ref } from 'vue';
import { Card, cardLetter, getClass } from '../card';
import { Player } from '../player';

type Props = {
  idx: number;
  isSelfPlayer: boolean;
  debugMode: boolean;
  player: Player;
  selectedCard: number;
  activeTurn: boolean;
  selectedHintPlayer: boolean;
};

export default {
  name: 'Player ',
  props: {
    idx: Number,
    isSelfPlayer: Boolean,
    debugMode: Boolean,
    player: Object,
    selectedCard: Number,
    activeTurn: Boolean,
    selectedHintPlayer: Boolean,
  },

  setup(props: Props, context: SetupContext){
    const selectedHint = ref(-1);
    return {
      playerAutoClick: () => context.emit("playerAutoClick"),
      playerCardClick: (idx: number) => context.emit("playerCardClick", idx),
      playCard: (idx: number) => context.emit("playCard", idx),
      discardCard: (idx: number) => context.emit("discardCard", idx),
      getColor: (i: number) => Card.prototype.getColor(i),
      selectHint: (idx: number) => {
        const disabled = selectedHint.value === idx && props.selectedHintPlayer;
        if(disabled){
          selectedHint.value = -1;
        }
        else{
          selectedHint.value = idx;
        }
        context.emit("selectHint", disabled);
      },
      doHint: () => {if(0 <= selectedHint.value){ context.emit("doHint", selectedHint.value) }},
      cardLetter,
      getClass,
      selectedHint,
      cardNumberHintClass: (card: Card, idx: number) => {
        const ret = ['small', card.possibleNumbers & (1 << idx) ? 'possible' : 'notPossible'];
        if(props.selectedHintPlayer && selectedHint.value < 5){
          if(card.number === selectedHint.value){
            if(idx === selectedHint.value){
              ret.push('selectedHint');
            }
            else if(card.possibleNumbers & (1 << idx)){
              ret.push("selectedAntiHint");
            }
          }
          else if(idx === selectedHint.value && card.possibleNumbers & (1 << idx)){
            ret.push("selectedAntiHint");
          }
        }
        return ret;
      },
      cardColorHintClass: (card: Card, idx: number) => {
        const ret = ['small', card.possibleColors & (1 << idx) ? 'possible' : 'notPossible'];
        if(props.selectedHintPlayer && 5 <= selectedHint.value){
          if(card.color + 5 === selectedHint.value){
            if(idx + 5 === selectedHint.value){
              ret.push('selectedHint');
            }
            else if(card.possibleColors & (1 << idx)){
              ret.push("selectedAntiHint");
            }
          }
          else if(idx + 5 === selectedHint.value && card.possibleColors & (1 << idx)){
            ret.push("selectedAntiHint");
          }
        }
        return ret;
      },
    }
  },
}
</script>

<style scoped>
.card {
  line-height: 1.2em;
  position: absolute;
  left: 0;
  width: 3.5em;
  padding: 0.25em;
  margin: 0.25em;
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
  line-height: 2.5em;
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
.selfBorder {
  border: solid 1px #00ff00;
}
.small {
  font-size: 80%;
}
.possible {
  color: #9babab;
}
.notPossible {
  color: #1c1e2f
}
.selectedHint {
  color: #7fffff;
  background-color: #3f7f7f;
}
.selectedAntiHint {
  color: #3f7f7f;
  background-color: #000000;
}
.cardLetter {
  color: #7b9cbc
}
.hintButton {
  color: #3f9faf;
  background-color: #0f2f2f;
  border: 3px ridge #6f9f9f;
  padding: 0.25em;
  margin: 0.25em;
  margin-right: 1em;
}
.hintButtonActive {
  color: #1f3f3f;
  background-color: #7fffff;
}
.hintSelectButton {
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  vertical-align: middle;
  border: 1px solid #3f7f7f;
  line-height: 2em;
}
.hintSelected {
  border: 2px solid #7fffff;
}
</style>
