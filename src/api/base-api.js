// import store from "../store.js";
import * as actions from "../actions/base-actions.js";

export const clear = () => (dispatch, getState) => {
  dispatch(actions.clear());
};
