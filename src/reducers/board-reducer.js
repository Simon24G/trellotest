import {
  CHANGE_NAME_COL,
  ADD_CARD,
  DELETE_CARD,
  CLEAR
} from "../actions/action-types.js";

function initCols() {
  let cols = {};
  let names = ["TODO", "In Progress", "Testing", "Done"];
  names.forEach((name, id) => {
    cols[id.toString()] = { id, name, cards: {} };
  });
  return cols;
}

//{...initialState} , Object.assign({},initialState) - does not help
const initialState = () => {
  return {
    id: 1,
    cols: initCols()
  };
};

const ACTION_HANDLER = {
  [CHANGE_NAME_COL]: (state, { id, name }) => {
    const { cols } = { ...state };
    cols[id.toString()].name = name;
    return {
      ...state,
      cols
    };
  },

  //dependent from cardReducer
  [ADD_CARD]: (state, { id, colId }) => {
    let { cols } = { ...state };
    cols[colId.toString()].cards[id.toString()] = {
      id,
      colId
    };
    return {
      ...state,
      cols
    };
  },
  [DELETE_CARD]: (state, { id, colId }) => {
    let { cols } = { ...state };
    delete cols[colId.toString()].cards[id.toString()];
    return {
      ...state,
      cols
    };
  },
  //base
  [CLEAR]: (state, action) => {
    return initialState(); //show if initialState
  }
};

const boardReducer = (state = initialState(), action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default boardReducer;
