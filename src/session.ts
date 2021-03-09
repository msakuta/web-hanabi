import { db } from './main';
import { Card } from './card';
import { Player } from './player';

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

export function updateSession(sessionId: string, fieldCards: Card[], players: Player[]){
    db.collection("/sessions").doc(sessionId).update({
        fieldCards: fieldCards.map(card => card.toString()),
        players: JSON.stringify(players),
    });
}

export async function loadSession(sessionId: string){
    const doc = await db.collection("/sessions").doc(sessionId).get();
    if(doc.exists){
        const fieldCards = doc.data()?.fieldCards as string[];
        return fieldCards.map((data) => {
            const card = new Card;
            card.fromString(data);
            return card;
        });
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
