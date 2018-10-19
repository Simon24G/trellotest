import {
  CHANGE_NAME_COL,
  ADD_CARD,
  DELETE_CARD,
  CLEAR
} from "../actions/action-types.js";

function initCols() {
  let cols = [];
  let names = ["TODO", "In Progress", "Testing", "Done"];
  names.forEach((name, id) => {
    cols.push({ id, name, cards: [] });
  });
  return cols;
}

const initialState = {
  id: 1,
  cols: initCols()
};

const ACTION_HANDLER = {
  [CHANGE_NAME_COL]: (state, action) => {
    const { cols } = { ...state };
    const newCols = cols.map(col => {
      if (col.id === action.id) {
        col.name = action.name;
      }

      return col;
    });

    return {
      ...state,
      cols: newCols
    };
  },

  //dependent from cardReducer
  [ADD_CARD]: (state, action) => {
    let { id, colId } = action;
    let newState = { ...state };
    newState.cols.get("" + colId).cards.set("" + id, {
      id,
      colId
    });
    return newState;
  },
  [DELETE_CARD]: (state, action) => {
    let newState = { ...state };
    newState.cols.get(action.colId.toString()).cards.delete("" + action.id);
    return newState;
  },
  //base
  [CLEAR]: (state, action) => {
    return initialState;
  }
};

const boardReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default boardReducer;
