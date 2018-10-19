import * as actions from "/../actions/user-actions.js";

export const logIn = name => (dispatch, getState) => {
  dispatch(actions.logIn(name));
};

export const logOut = () => (dispatch, getState) => {
  dispatch(actions.logOut());
};

export const openCard = (id, colId) => (dispatch, getState) => {
  dispatch(actions.openCard(id, colId));
};

export const closeCard = () => (dispatch, getState) => {
  dispatch(actions.closeCard());
};
