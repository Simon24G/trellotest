import * as types from "/action-types.js";

export function addCard(id, name, description, colId) {
  return { type: types.ADD_CARD, id, name, description, colId };
}

export function deleteCard(id, colId) {
  return { type: types.DELETE_CARD, id, colId };
}

export function changeCard(id, name, description) {
  return { type: types.CHANGE_CARD, id, name, description };
}
