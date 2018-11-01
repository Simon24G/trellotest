import * as actions from "../actions/user-action";
export const logIn = name => dispatch => {
  dispatch(actions.logIn(name));
};

export const logOut = () => dispatch => {
  dispatch(actions.logOut());
};

export const openCard = (id, colId) => dispatch => {
  dispatch(actions.openCard(id, colId));
};

export const closeCard = () => dispatch => {
  dispatch(actions.closeCard());
};
