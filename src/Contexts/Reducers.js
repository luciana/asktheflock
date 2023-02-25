import { STATENAME, TYPES } from "../Constants";

function saveState(state) {
  console.log("App reducer update local storage for " , STATENAME, JSON.stringify(state));
  localStorage.setItem(STATENAME, JSON.stringify(state));
}

function updateLang(state, payload) {
  const newState = { ...state, lang: payload };
  saveState(newState); 
  return newState;
}

function updateUser(state, payload) {
  //localStorage.removeItem(STATENAME);
  const newState = { ...state, user: payload };
  saveState(newState);
  console.log("App reducer update user" , state);
  return newState;
}

export default function AppReducer(state, { type, payload }) {
  console.log("App reducer payload and type" , payload, type);
  switch (type) {
    case TYPES.UPDATE_LANG:
      console.log("App reducer TYPES.UPDATE_LANG state and payload" , state, payload);
      return updateLang(state, payload);
    case TYPES.UPDATE_USER:
      return updateUser(state, payload);
    default:
      throw new Error("TYPE NOT FOUND");
  }
}