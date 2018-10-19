import * as actions from "/../actions/comment-actions.js";

export const addComment = (text, authorName, cardId) => (
  dispatch,
  getState
) => {
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);
  dispatch(actions.addComment(id, text, authorName, cardId));
};

export const deleteComment = (id, cardId) => (dispatch, getState) => {
  dispatch(actions.deleteComment(id, cardId));
};

export const changeComment = (id, text, cardId) => (dispatch, getState) => {
  dispatch(actions.changeComment(id, text, cardId));
};
