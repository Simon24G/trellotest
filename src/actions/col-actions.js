import * as types from "/action-types.js";

export function changeNameCol(id, name) {
  return { type: types.CHANGE_NAME_COL, id, name };
}
