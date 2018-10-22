import {
  ADD_CARD,
  DELETE_CARD,
  CHANGE_CARD,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT,
  CLEAR
} from "../actions/action-types.js";

const initialState = new Map();

const ACTION_HANDLER = {
  [ADD_CARD]: (state, action) => {
    console.log(state);
    let { id, name, description, colId } = action;
    let card = {
      id,
      name,
      description,
      comments: new Map(),
      colId
    };
    let cards = { ...state };
    cards.set(id.toString(), card);
    return cards;
  },
  [DELETE_CARD]: (state, action) => {
    let cards = { ...state };
    cards.delete(action.id.toString());
    return cards;
  },
  [CHANGE_CARD]: (state, action) => {
    let cards = { ...state }; //Object.assign({}, state);
    let card = cards.get(action.id.toString());
    card.name = action.name;
    card.description = action.description;
    //auto update cards?
    return cards;
  },
  [ADD_COMMENT]: (state, action) => {
    let { id, text, authorName, cardId } = action;
    let comment = {
      id,
      text,
      authorName,
      cardId
    };
    let cards = { ...state };
    let card = cards.get(cardId.toString());
    card.comments.set(id.toString(), comment);
    //call boardReducer with { ...action, id }
    return cards;
  },
  [DELETE_COMMENT]: (state, action) => {
    let cards = { ...state };
    cards.get(action.cardId.toString()).comments.delete(action.id.toString());
    return cards;
  },
  [CHANGE_COMMENT]: (state, action) => {
    let cards = { ...state };
    let card = cards
      .get(action.cardId.toString())
      .comments.get(action.id.toString());
    card.text = action.text;
    return cards;
  },
  [CLEAR]: (state, action) => {
    return new Map();
  }
};

const cardReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLER[action.type];
  return handler ? handler(state, action) : state;
};

export default cardReducer;
