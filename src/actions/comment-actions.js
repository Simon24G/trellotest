import { ADD_COMMENT, DELETE_COMMENT, CHANGE_COMMENT } from "./action-types.js";

export function addComment(id, text, authorName, cardId) {
  return { type: ADD_COMMENT, id, text, authorName, cardId };
}

export function deleteComment(id, cardId) {
  return { type: DELETE_COMMENT, id, cardId };
}

export function changeComment(id, text, cardId) {
  return { type: CHANGE_COMMENT, id, text, cardId };
}
