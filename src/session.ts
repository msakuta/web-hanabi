import { offlineMode, db } from './main';

// Sessions are supposed to be shared, so it's shorter than userId.
const sessionIdLength = 20;

export function generateSessionId(){
  if(offlineMode || !db){
    return "";
  }
  // This is not cryptographically safe random number, but we'd settle for this
  // because this application is not serious.
  // At this point the sessionId in users should be initialized.
  const doc = db.collection("/sessions").doc();
  doc.set({});
  localStorage.setItem('WebHanabiSessionId', doc.id);
  return doc.id;
}


export function loadSessionId(){
  if(offlineMode || !db){
    return "";
  }
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
