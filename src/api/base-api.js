import * as actions from "../actions/base-actions.js";

export const clear = () => dispatch => {
  dispatch(actions.clear());
};
