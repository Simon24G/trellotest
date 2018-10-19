import { ADD_CARD, DELETE_CARD, CHANGE_CARD } from "./action-types.js";

export function addCard(id, name, description, colId) {
  return { type: ADD_CARD, id, name, description, colId };
}

export function deleteCard(id, colId) {
  return { type: DELETE_CARD, id, colId };
}

export function changeCard(id, name, description) {
  return { type: CHANGE_CARD, id, name, description };
}
