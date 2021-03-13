import { db } from './main';

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
    const params = new URLSearchParams(document.location.search.substring(1));
    let sessionId = params.get('sessionId');
    if(sessionId && sessionId.length === sessionIdLength){
        return sessionId;
    }
    const st = localStorage.getItem('WebHanabiSessionId');
    if(st && typeof st === "string" && st.length === sessionIdLength){
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
