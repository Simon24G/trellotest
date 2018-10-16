import store from "../store.js";
import * as actions from "../actions/card-actions.js";

export function addCard(name, description, colId) {
  let id = 1 + +localStorage.getItem("last_id");
  localStorage.setItem("last_id", id);
  store.dispatch(actions.addCard(id, name, description, colId));
}

export function deleteCard(id, colId) {
  store.dispatch(actions.deleteCard(id, colId));
}

export function changeCard(id, name, description) {
  store.dispatch(actions.changeCard(id, name, description));
}
