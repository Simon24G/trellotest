import store from "../store.js";
import * as actions from "../actions/user-actions.js";

export function logIn(name) {
  store.dispatch(actions.logIn(name));
}

export function logOut() {
  store.dispatch(actions.logOut());
}

export function openCard(id, colId) {
  store.dispatch(actions.openCard(id, colId));
}

export function closeCard() {
  store.dispatch(actions.closeCard());
}
