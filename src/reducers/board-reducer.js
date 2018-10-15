import * as types from "../actions/action-types.js";

function initCols() {
  let cols = new Map();
  let names = ["TODO", "In Progress", "Testing", "Done"];
  names.forEach((name, id) => {
    cols.set("" + id, { id, name, cards: new Map() });
  });
  return { ...cols };
}

const initialState = {
  id: 1,
  cols: initCols(),
  author: null
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NAME_COL: {
      let newState = { ...state };
      newState.cols.get("" + action.colId).name = action.name;
      return newState;
    }

    //dependent from cardReducer
    case types.ADD_CARD: {
      let { id, colId } = action;
      let newState = { ...state };
      newState.cols.get("" + colId).cards.set("" + id, {
        id,
        colId
      });
      return newState;
    }
    case types.DELETE_CARD: {
      let newState = { ...state };
      newState.cols.get("" + action.colId).cards.delete("" + action.id);
      return newState;
    }
    //base
    case types.CLEAR: {
      return initialState;
    }
    case types.LOG_IN: {
      return { ...state, author: { name: action.name } };
    }
    case types.LOG_OUT: {
      return { ...state, author: null };
    }
    default: {
      return state;
    }
  }
};

export default boardReducer;
