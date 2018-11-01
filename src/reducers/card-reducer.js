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
    const { [id.toString()]: colToDelete, ...newCards } = state;

    return newCards;
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
    const { [id.toString()]: colToDelete, ...newComments } = state[
      cardId.toString()
    ].comments;

    return {
      ...state,
      [cardId.toString()]: {
        ...state[cardId.toString()],
        comments: newComments
      }
    };
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
  [CLEAR]: () => {
    return initialState();
  }
};

const cardReducer = (state = initialState(), action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default cardReducer;
