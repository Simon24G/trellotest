import * as actions from "../actions/card-actions.js";

export const addCard = (name, description, colId) => dispatch => {
  if (description === "" || name === "") return;
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);

  dispatch(actions.addCard(id, name, description, colId));
};

export const deleteCard = (id, colId) => dispatch => {
  dispatch(actions.deleteCard(id, colId));
};

export const changeCard = (id, newName, newDescription) => (
  dispatch,
  getState
) => {
  if (newDescription === "" || newName === "") return;
  const { name, description } = getState().cardState[id.toString()];
  if (newDescription === description && newName === name) return;

  dispatch(actions.changeCard(id, newName, newDescription));
};
