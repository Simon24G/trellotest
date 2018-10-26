import {
  ADD_CARD,
  DELETE_CARD,
  CHANGE_CARD,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT,
  CLEAR
} from "../actions/action-types.js";

const initialState = () => {
  return {};
};

const ACTION_HANDLER = {
  [ADD_CARD]: (state, { id, name, description, colId }) => {
    let card = {
      id,
      name,
      description,
      comments: {},
      colId
    };
    return { ...state, [id.toString()]: card };
  },
  [DELETE_CARD]: (state, { id }) => {
    let newCards = {};
    for (var key in state) {
      if (state.hasOwnProperty(key) && key !== id.toString()) {
        newCards[key] = state[key];
      }
    }
    return { ...newCards };
  },
  [CHANGE_CARD]: (state, { id, name, description }) => {
    return {
      ...state,
      [id.toString()]: {
        ...state[id.toString()],
        name,
        description
      }
    };
  },
  [ADD_COMMENT]: (state, { id, text, authorName, cardId }) => {
    let comment = {
      id,
      text,
      authorName,
      cardId
    };
    return {
      ...state,
      [cardId.toString()]: {
        ...state[cardId.toString()],
        comments: {
          ...state[cardId.toString()].comments,
          [id.toString()]: comment
        }
      }
    };
  },
  [DELETE_COMMENT]: (state, { id, cardId }) => {
    let cards = { ...state };
    delete cards[cardId.toString()].comments[id.toString()];
    return { ...cards };
  },
  [CHANGE_COMMENT]: (state, { id, text, cardId }) => {
    return {
      ...state,
      [cardId.toString()]: {
        ...state[cardId.toString()],
        comments: {
          ...state[cardId.toString()].comments,
          [id.toString()]: {
            ...state[cardId.toString()].comments[id.toString()],
            text
          }
        }
      }
    };
  },
  [CLEAR]: (state, action) => {
    return initialState();
  }
};

const cardReducer = (state = initialState(), action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default cardReducer;
