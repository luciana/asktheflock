import { STATENAME, TYPES } from "../Constants";

function saveState(state) {
  localStorage.setItem(STATENAME, JSON.stringify(state));
}

function updateLang(state, payload) {
  const newState = { ...state, lang: payload };
  //saveState(newState); 
  return newState;
}

function updateUser(state, payload) {
  //localStorage.removeItem(STATENAME);
  const newState = { ...state, user: payload };
  //saveState(newState);
  return newState;
}

export default function AppReducer(state, { type, payload }) {

  switch (type) {
    case TYPES.UPDATE_LANG:
      return updateLang(state, payload);
    case TYPES.UPDATE_USER:
      return updateUser(state, payload);
    default:
      throw new Error("TYPE NOT FOUND");
  }
}