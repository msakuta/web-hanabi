import firebase from 'firebase';
import { db, userId, loadUserName } from './main';
import { Card, genCards, drawCard } from './card';
import { Player } from './player';
import WebHanabi from './components/WebHanabi.vue';

export type SessionData = {
  fieldCards: Card[];
  players: Player[];
}

export class GameState {
  userName: string;
  sessionId: string;
  fieldCards: Card[];
  players: Player[];
  thePlayer: number;

  constructor(){
    this.userName = "";
    this.sessionId = loadSessionId();
    this.fieldCards = genCards(),
    this.players = [...Array(4)].map((_, i) => new Player(i === this.thePlayer ? this.userName : `Player ${i}`,
      this.fieldCards, i !== 0, drawCard));
    this.thePlayer = 0;
  }

  /// Defer initialization to enable event handlers
  init() {
    loadUserName().then(name => {
      this.userName = name;
      this.players[this.thePlayer].name = name;
      this.players[this.thePlayer].playerId = userId;
    });

    loadSession(this.sessionId).then(value => this.applySession(value));

    db.collection('/sessions').doc(this.sessionId).onSnapshot({
      next: data => {
        if(data.exists){
          this.applySession(deserializeSession(data));
        }
      }
    });
  }

  newSession(){
    this.sessionId = generateSessionId();
    this.updateSession();
  }

  applySession(value?: SessionData | null) {
    if(value){
      this.fieldCards.length = 0;
      for(const card of value.fieldCards)
        this.fieldCards.push(card);
      this.thePlayer = -1;
      this.players.length = 0;
      let foundSelf = false;
      for(let idx = 0; idx < value.players.length; idx++){
        const player = value.players[idx];
        this.players.push(player);
        if(player.playerId === userId){
          this.thePlayer = idx;
          foundSelf = true;
        }
      }

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
  }

  updateSession(){
    db.collection("/sessions").doc(this.sessionId).update({
        fieldCards: this.fieldCards.map(card => card.toString()),
        players: this.players.map(player => player.serialize()),
    });
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
    db.collection("/sessions").doc(sessionId).set({hello: "world"});
    return sessionId;
}

export function deserializeSession(doc?: firebase.firestore.DocumentData): SessionData | null {
  if(!doc)
    return null;
  const fieldCards = doc.get("fieldCards") as string[] | null;
  if(!fieldCards)
    return null;
  const players = doc.get("players") as any[] | null;
  if(!players)
    return null;
  return {
    fieldCards: fieldCards.map((data) => {
        const card = new Card;
        card.fromString(data);
        return card;
    }),
    players: players.map(data => {
        const player = new Player("", [], undefined);
        player.deserialize(data);
        return player;
    }),
  };
}

export async function loadSession(sessionId: string): Promise<SessionData | null> {
    const doc = await db.collection("/sessions").doc(sessionId).get();
    if(doc.exists){
        return deserializeSession(doc);
    }
    else{
        return null;
    }
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
