import {
  LOG_IN,
  LOG_OUT,
  OPEN_WINDOW_CARD,
  CLOSE_WINDOW_CARD
} from "./action-types.js";

export function logIn(name) {
  return { type: LOG_IN, name };
}

export function logOut() {
  return { type: LOG_OUT };
}

export function openCard(id, colId) {
  return { type: OPEN_WINDOW_CARD, id, colId };
}

export function closeCard() {
  return { type: CLOSE_WINDOW_CARD };
}
