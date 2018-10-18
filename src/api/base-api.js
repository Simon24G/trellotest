import store from "../store.js";
import * as actions from "../actions/base-actions.js";

export function clear() {
  store.dispatch(actions.clear());
}
