import {
  ADD_CARD,
  DELETE_CARD,
  OPEN_WINDOW_CARD,
  CLOSE_WINDOW_CARD,
  LOG_IN,
  LOG_OUT,
  CLEAR
} from "../actions/action-types.js";

const initialState = {
  author: null,
  currentCard: { openCard: false, card: {} }
};

//TODO: idea: To card save current values edit card
const ACTION_HANDLER = {
  [ADD_CARD]: (state, action) => {
    let newState = { ...state };
    newState.currentCard.card = { id: action.id, colId: action.colId };
    return newState;
  },

  [DELETE_CARD]: (state, action) => {
    let newState = { ...state };
    if (newState.currentCard.card.id === action.id) {
      newState.currentCard.card = { id: 0 };
      newState.currentCard.openCard = false;
    }
    return newState;
  },

  [OPEN_WINDOW_CARD]: (state, action) => {
    let newState = { ...state };
    newState.currentCard.card = { id: action.id, colId: action.colId };
    newState.currentCard.openCard = true;
    return newState;
  },

  [CLOSE_WINDOW_CARD]: (state, action) => {
    let newState = { ...state };
    newState.currentCard.card = {};
    newState.currentCard.openCard = false;
    return newState;
  },

  [LOG_IN]: (state, action) => {
    return { ...state, author: { name: action.name } };
  },

  [LOG_OUT]: (state, action) => {
    return { ...state, author: null };
  },

  //base
  [CLEAR]: (state, action) => {
    return initialState;
  }
};

const userReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default userReducer;
