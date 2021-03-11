import firebase from 'firebase';
import { db, userId, loadUserName } from './main';
import { Card, genCards, drawCard } from './card';
import { Player } from './player';

export class GameState {
  userName: string;
  sessionId: string;
  history: string[] = [];
  fieldCards: Card[] = [];
  discardedCards: Card[] = [];
  playedCards: Card[][] = [...Array(5)].map(() => []);
  players: Player[] = [];
  thePlayer = 0;
  globalTurn = 0;
  tokens = 8;
  strikes = 0;

  constructor(){
    this.userName = "";
    this.sessionId = loadSessionId();
    this.resetGame();
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
  }

  /// Defer initialization to enable event handlers
  init() {
    loadUserName().then(name => {
      this.userName = name;
      this.players[this.thePlayer].name = name;
      this.players[this.thePlayer].playerId = userId;
    });

    this.loadSession(this.sessionId).then(value => this.deserializeSession(value));

    db.collection('/sessions').doc(this.sessionId).onSnapshot({
      next: data => {
        if(data.exists){
          this.deserializeSession(data);
        }
      }
    });
  }

  newSession(){
    this.sessionId = generateSessionId();
    this.resetGame();
    this.updateSession();
  }

  updateSession(){
    db.collection("/sessions").doc(this.sessionId).update({
      history: this.history,
      fieldCards: this.fieldCards.map(card => card.toString()),
      discardedCards: this.discardedCards.map(card => card.toString()),
      playedCards: this.playedCards.map(cards => cards.length),
      players: this.players.map(player => player.serialize()),
      globalTurn: this.globalTurn,
      tokens: this.tokens,
      strikes: this.strikes,
    });
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
  
    this.history = history;

    this.fieldCards = fieldCards.map((data) => {
      const card = new Card;
      card.fromString(data);
      return card;
    });

    this.discardedCards = discardedCards.map((data) => {
      const card = new Card;
      card.fromString(data);
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
    saveSessionId(newId);
  }
}

// Sessions are supposed to be shared, so it's shorter than userId.
const sessionIdLength = 20;

export function generateSessionId(){
    let sessionId = "";
    // This is not cryptographically safe random number, but we'd settle for this
    // because this application is not serious.
    for(let i = 0; i < sessionIdLength; i++)
        sessionId += Math.floor(Math.random() * 16).toString(16);
    localStorage.setItem('WebHanabiSessionId', sessionId);
    // At this point the sessionId in users should be initialized.
    db.collection("/sessions").doc(sessionId).set({});
    return sessionId;
}


export function loadSessionId(){
    const st = localStorage.getItem('WebHanabiSessionId');
    let ok = false;
    let sessionId = "";
    if(st && typeof st === "string" && st.length === sessionIdLength){
        ok = true;
        sessionId = st;
    }
    else{
        // If the data is not as expected, regenerate random id
        sessionId = generateSessionId();
    }
    return sessionId;
}

export function saveSessionId(sessionId: string){
    localStorage.setItem('WebHanabiSessionId', sessionId);
}
