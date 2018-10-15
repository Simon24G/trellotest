import * as types from "/action-types.js";

export function changeNameCol(colId, name) {
  return { type: types.CHANGE_NAME_COL, colId, name };
}
