import store from "../store.js";
import * as actions from "../actions/col-actions.js";

export function changeNameCol(colId, name) {
  store.dispatch(actions.changeNameCol(colId, name));
}
