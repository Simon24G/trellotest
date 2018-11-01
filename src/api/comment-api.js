import * as actions from "../actions/comment-actions.js";

export const addComment = (text, authorName, cardId) => dispatch => {
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);
  dispatch(actions.addComment(id, text, authorName, cardId));
};

export const deleteComment = (id, cardId) => dispatch => {
  dispatch(actions.deleteComment(id, cardId));
};

export const changeComment = (id, text, cardId) => dispatch => {
  dispatch(actions.changeComment(id, text, cardId));
};
