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
    let cards = { ...state };
    delete cards[id.toString()];
    return cards;
  },
  [CHANGE_CARD]: (state, { id, name, description }) => {
    let cards = { ...state };
    let card = cards[id.toString()];
    card.name = name;
    card.description = description;
    return cards;
  },
  [ADD_COMMENT]: (state, { id, text, authorName, cardId }) => {
    let comment = {
      id,
      text,
      authorName,
      cardId
    };
    let cards = { ...state };
    cards[cardId.toString()].comments[id.toString()] = comment;
    return cards;
  },
  [DELETE_COMMENT]: (state, { id, cardId }) => {
    let cards = { ...state };
    delete cards[cardId.toString()].comments[id.toString()];
    return cards;
  },
  [CHANGE_COMMENT]: (state, { id, text, cardId }) => {
    let cards = { ...state };
    cards[cardId.toString()].comments[id.toString()].text = text;
    return cards;
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
