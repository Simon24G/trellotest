import store from "../store.js";
import * as actions from "../actions/card-actions.js";

export function addCard(name, description, colId) {
  if (description === "" || name === "") return;
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);

  store.dispatch(actions.addCard(id, name, description, colId));
}

export function deleteCard(id, colId) {
  store.dispatch(actions.deleteCard(id, colId));
}

export function changeCard(id, newName, newDescription) {
  if (newDescription === "" || newName === "") return;
  const { name, description } = store.getState().cardState.get("" + id);
  if (newDescription === description && newName === name) return;

  store.dispatch(actions.changeCard(id, newName, newDescription));
}
