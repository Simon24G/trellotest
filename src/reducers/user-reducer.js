import * as types from "../actions/action-types.js";

const initialState = {
  author: null,
  currentCard: { openCard: false, card: {} }
};
//TODO: idea: To card save current values edit card
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CARD: {
      let newState = { ...state };
      newState.currentCard.card = { id: action.id, colId: action.colId };
      return newState;
    }

    case types.DELETE_CARD: {
      let newState = { ...state };
      if (newState.currentCard.card.id === action.id) {
        newState.currentCard.card = { id: 0 };
        newState.currentCard.openCard = false;
      }
      return newState;
    }

    case types.OPEN_WINDOW_CARD: {
      let newState = { ...state };
      newState.currentCard.card = { id: action.id, colId: action.colId };
      newState.currentCard.openCard = true;
      return newState;
    }

    case types.CLOSE_WINDOW_CARD: {
      let newState = { ...state };
      newState.currentCard.card = {};
      newState.currentCard.openCard = false;
      return newState;
    }

    case types.LOG_IN: {
      return { ...state, author: { name: action.name } };
    }

    case types.LOG_OUT: {
      return { ...state, author: null };
    }

    //base
    case types.CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
