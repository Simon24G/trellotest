import {
  CHANGE_NAME_COL,
  ADD_CARD,
  DELETE_CARD,
  CLEAR
} from "../actions/action-types.js";

function initCols() {
  let cols = new Map();
  let names = ["TODO", "In Progress", "Testing", "Done"];
  names.forEach((name, id) => {
    cols.set("" + id, { id, name, cards: new Map() });
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
  [CHANGE_NAME_COL]: (state, action) => {
    const { cols } = { ...state };
    cols.get(action.id.toString()).name = action.name;
    return {
      ...state,
      cols
    };
  },

  //dependent from cardReducer
  [ADD_CARD]: (state, action) => {
    let { id, colId } = action;
    let { cols } = { ...state };
    cols.get("" + colId).cards.set("" + id, {
      id,
      colId
    });
    return {
      ...state,
      cols
    };
  },
  [DELETE_CARD]: (state, action) => {
    let { cols } = { ...state };
    cols.get(action.colId.toString()).cards.delete("" + action.id);
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
