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
    return {
      ...state,
      cols: {
        ...state.cols,
        [id.toString()]: { ...state.cols[id.toString()], name }
      }
    };
  },

  //dependent from cardReducer
  [ADD_CARD]: (state, { id, colId }) => {
    return {
      ...state,
      cols: {
        ...state.cols,
        [colId.toString()]: {
          ...state.cols[colId.toString()],
          cards: {
            ...state.cols[colId.toString()].cards,
            [id.toString()]: {
              id,
              colId
            }
          }
        }
      }
    };
  },
  [DELETE_CARD]: (state, { id, colId }) => {
    let cards = state.cols[colId.toString()].cards;
    let newCards = {};
    for (var key in cards) {
      if (cards.hasOwnProperty(key) && key !== id.toString()) {
        newCards[key] = cards[key];
      }
    }
    return {
      ...state,
      cols: {
        ...state.cols,
        [colId.toString()]: {
          ...state.cols[colId.toString()],
          cards: newCards
        }
      }
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
