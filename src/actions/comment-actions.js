import * as types from "/action-types.js";

export function addComment(id, text, authorName, cardId) {
  return { type: types.ADD_COMMENT, id, text, authorName, cardId };
}

export function deleteComment(id, cardId) {
  return { type: types.DELETE_COMMENT, id, cardId };
}

export function changeComment(id, text, cardId) {
  return { type: types.CHANGE_COMMENT, id, text, cardId };
}
