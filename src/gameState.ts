import firebase from 'firebase';
import { db, userId, loadUserName } from './main';
import { Card, genCards, drawCard } from './card';
import { Player } from './player';
import { loadSessionId, saveSessionId, generateSessionId } from './session';

export class GameState {
  userName: string;
  sessionId: string;
  unsubscriber?: () => void;
  history: string[] = [];
  fieldCards: Card[] = [];
  discardedCards: Card[] = [];
  playedCards: Card[][] = [...Array(5)].map(() => []);
  players: Player[] = [];
  thePlayer = 0;
  globalTurn = 0;
  tokens = 8;
  strikes = 0;
  startDate = 0;
  lastRoundBegun = -1;
  tryNextMove?: (noUpdate: boolean) => void;

  constructor(){
    this.userName = "";
    this.sessionId = loadSessionId();
    this.resetGame();
  }

  get gameOver() {
    return 3 <= this.strikes || this.playedCards.reduce(
      (pre: boolean, cur: Card[]) =>
        pre && 0 < cur.length && cur[cur.length-1].number === 4, true) ||
          0 <= this.lastRoundBegun &&
          this.lastRoundBegun + this.players.length <= this.globalTurn;
  }

  resetGame() {
    this.thePlayer = 0; // The resetter is always the host.
    this.history = [];
    this.fieldCards = genCards(),
    this.discardedCards = [];
    this.playedCards = [...Array(5)].map(() => []);
    this.players = [...Array(4)].map((_, i) => new Player(i === this.thePlayer ? this.userName : `Player ${i}`,
      this.fieldCards, i !== 0, drawCard));
    this.players[this.thePlayer].playerId = userId;
    this.globalTurn = 0;
    this.tokens = 8;
    this.strikes = 0;
    this.startDate = Date.now();
    this.lastRoundBegun = -1;
  }

  /// Defer initialization to enable event handlers
  init() {
    loadUserName().then(name => {
      this.userName = name;
      this.players[this.thePlayer].name = name;
      this.players[this.thePlayer].playerId = userId;
    });

    this.loadSession(this.sessionId).then(value => this.deserializeSession(value));

    this.subscribe();
  }

  subscribe(){
    if(this.unsubscriber)
      this.unsubscriber();
    this.unsubscriber = db.collection('/sessions').doc(this.sessionId).onSnapshot({
      next: data => {
        if(data.exists){
          this.deserializeSession(data);

          // When another player than the host plays, try to run an AI if the next player was an AI.
          // Do not upload the state because it would make infinite loop.
          if(this.tryNextMove){
            this.tryNextMove(true);
          }
        }
      }
    });
  }

  newSession(){
    if(!confirm("This session will be discarded. Are you sure?"))
      return;
    this.sessionId = generateSessionId();
    this.subscribe();
    this.resetGame();
    this.updateSession();
  }

  updateSession(){
    console.log(`updateSession ${this.globalTurn}`);
    // eslint-disable-next-line
    const data: any = {
      history: this.history,
      fieldCards: this.fieldCards.map(card => card.serialize()),
      discardedCards: this.discardedCards.map(card => card.serialize()),
      playedCards: this.playedCards.map(cards => cards.length),
      players: this.players.map(player => player.serialize()),
      globalTurn: this.globalTurn,
      tokens: this.tokens,
      strikes: this.strikes,
      startDate: this.startDate,
    };
    if(0 <= this.lastRoundBegun){
      data.lastRoundBegun = this.lastRoundBegun;
    }
    db.collection("/sessions").doc(this.sessionId).update(data);
  }

  deserializeSession(doc?: firebase.firestore.DocumentData) {
    if(!doc)
      return null;
    const history = doc.get("history") as string[] | undefined;
    if(history === undefined)
      return null;
    const fieldCards = doc.get("fieldCards") as string[] | undefined;
    if(!fieldCards)
      return null;
    const discardedCards = doc.get("discardedCards") as string[] | undefined;
    if(!discardedCards)
      return null;
    const playedCards = doc.get("playedCards") as string[][] | undefined;
    if(!playedCards)
      return null;
    // eslint-disable-next-line
    const players = doc.get("players") as any[] | undefined;
    if(!players)
      return null;
    const globalTurn = doc.get("globalTurn") as number | undefined;
    if(globalTurn === undefined)
      return null;
    const tokens = doc.get("tokens") as number | undefined;
    if(tokens === undefined)
      return null;
    const strikes = doc.get("strikes") as number | undefined;
    if(strikes === undefined)
      return null;
    const startDate = doc.get("startDate") as number | undefined;
    if(startDate === undefined)
      return null;
    const lastRoundBegun = doc.get("lastRoundBegun") as number | undefined;

    console.log(`deserializeSession ${globalTurn}`);

    this.history = history;

    this.fieldCards = fieldCards.map((data) => {
      const card = new Card;
      card.deserialize(data);
      return card;
    });

    this.discardedCards = discardedCards.map((data) => {
      const card = new Card;
      card.deserialize(data);
      return card;
    });

    this.playedCards = playedCards.map((size, color) => [...Array(size)].map((_, number) =>
      new Card(number, color)));

    this.thePlayer = -1;
    let foundSelf = false;
    this.players = players.map((data, idx) => {
      const player = new Player("", [], undefined);
      player.deserialize(data);
      if(player.playerId === userId){
        this.thePlayer = idx;
        foundSelf = true;
      }
      return player;
    });

    this.globalTurn = globalTurn;
    this.tokens = tokens;
    this.strikes = strikes;
    this.lastRoundBegun = lastRoundBegun === undefined ? -1 : lastRoundBegun;

    if(!foundSelf){
      const firstNonPlayer = this.players.findIndex(player => !player.playerId);
      if(0 <= firstNonPlayer){
        this.players[firstNonPlayer].name = this.userName;
        this.players[firstNonPlayer].playerId = userId;
        this.players[firstNonPlayer].auto = false;
        this.updateSession();
      }
    }
  }

  async loadSession(sessionId: string) {
    return await db.collection("/sessions").doc(sessionId).get();
  }

  async joinSession(){
    const newId = prompt("Enter session id");
    if(!newId)
      return;
    const sessionData = await this.loadSession(newId);
    this.deserializeSession(sessionData);
    this.sessionId = newId;
    this.subscribe();
    saveSessionId(newId);
  }

  playerName(player: Player){
    const id = this.players.indexOf(player);
    if(id === this.thePlayer){
      return "You";
    }
    else{
      return `Player ${id}`;
    }
  }
}
