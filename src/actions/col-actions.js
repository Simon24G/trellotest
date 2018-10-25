import { CHANGE_NAME_COL } from "./action-types.js";

export function changeNameCol(id, name) {
  console.log(name);
  return { type: CHANGE_NAME_COL, id, name };
}
