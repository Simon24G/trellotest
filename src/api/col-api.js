import * as actions from "/../actions/col-actions.js";

export const changeNameCol = (colId, name) => dispatch => {
  dispatch(actions.changeNameCol(colId, name));
};
