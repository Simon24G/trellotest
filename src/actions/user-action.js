import * as types from "/action-types.js";

export function logIn(name) {
  return { type: types.LOG_IN, name };
}

export function logOut() {
  return { type: types.LOG_OUT };
}

export function openCard(id, colId) {
  return { type: types.OPEN_WINDOW_CARD, id, colId };
}

export function closeCard() {
  return { type: types.CLOSE_WINDOW_CARD };
}
