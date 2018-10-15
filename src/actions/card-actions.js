import * as types from "/action-types.js";

export function addCard(name, description, colId) {
  return { type: types.ADD_CARD, name, description, colId };
}

export function deleteCard(cardId, colId) {
  return { type: types.DELETE_CARD, cardId, colId };
}

export function changeCard(cardId, name, description) {
  return { type: types.CHANGE_CARD, cardId, name, description };
}
