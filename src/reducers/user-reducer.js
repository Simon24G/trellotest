import {
  ADD_CARD,
  DELETE_CARD,
  OPEN_WINDOW_CARD,
  CLOSE_WINDOW_CARD,
  LOG_IN,
  LOG_OUT,
  CLEAR
} from "../actions/action-types.js";

const initialState = () => {
  return {
    author: null,
    currentCard: { openCard: false, card: {} }
  };
};

//TODO: idea: To card save current values edit card
const ACTION_HANDLER = {
  [ADD_CARD]: (state, { id, colId }) => {
    return {
      ...state,
      currentCard: { ...state.currentCard, card: { id, colId } }
    };
  },

  [DELETE_CARD]: (state, { id }) => {
    if (state.currentCard.card.id === id) {
      return {
        ...state,
        currentCard: { ...state.currentCard, card: {}, openCard: false }
      };
    }
    return {
      ...state
    };
  },
  [OPEN_WINDOW_CARD]: (state, { id, colId }) => {
    return {
      ...state,
      currentCard: { ...state.currentCard, card: { id, colId }, openCard: true }
    };
  },

  [CLOSE_WINDOW_CARD]: (state, action) => {
    return {
      ...state,
      currentCard: { ...state.currentCard, card: {}, openCard: false }
    };
  },

  [LOG_IN]: (state, { name }) => {
    return { ...state, author: { name } };
  },

  [LOG_OUT]: (state, action) => {
    return { ...state, author: null };
  },

  //base
  [CLEAR]: (state, action) => {
    return initialState();
  }
};

const userReducer = (state = initialState(), action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default userReducer;
