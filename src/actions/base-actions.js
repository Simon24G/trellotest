import * as types from "/action-types.js";

export function logIn(name) {
  return { type: types.LOG_IN, name };
}

export function logOut() {
  return { type: types.LOG_OUT };
}

export function clear() {
  return { type: types.CLEAR };
}
