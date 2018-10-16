import store from "../store.js";
import * as actions from "../actions/base-actions.js";

export function logIn(name) {
  store.dispatch(actions.logIn(name));
}

export function logOut() {
  store.dispatch(actions.logOut());
}

export function clear() {
  store.dispatch(actions.clear());
}
