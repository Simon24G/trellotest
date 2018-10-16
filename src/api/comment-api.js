import store from "../store.js";
import * as actions from "../actions/comment-actions.js";

export function addComment(text, authorName, cardId) {
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);
  store.dispatch(actions.addComment(id, text, authorName, cardId));
}

export function deleteComment(id, cardId) {
  store.dispatch(actions.deleteComment(id, cardId));
}

export function changeComment(id, text, cardId) {
  store.dispatch(actions.changeComment(id, text, cardId));
}
