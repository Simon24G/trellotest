import * as types from "/action-types.js";

export function addComment(text, authorName, cardId) {
  return { type: types.ADD_COMMENT, text, authorName, cardId };
}

export function deleteComment(commentId, cardId) {
  return { type: types.DELETE_COMMENT, commentId, cardId };
}

export function changeComment(commentId, text, cardId) {
  return { type: types.CHANGE_COMMENT, commentId, text, cardId };
}
