import * as types from "../actions/action-types.js";

const initialState = new Map();

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CARD: {
      let { id, name, description, colId } = action;
      //let id = 1 + +localStorage.getItem("last_id");
      let card = {
        id,
        name,
        description,
        comments: new Map(),
        colId
      };
      let cards = { ...state };
      cards.set("" + id, card);
      return cards;
    }
    case types.DELETE_CARD: {
      let cards = { ...state };
      cards.delete("" + action.id);
      return cards;
    }
    case types.CHANGE_CARD: {
      let cards = { ...state }; //Object.assign({}, state);
      let card = cards.get("" + action.id);
      card.name = action.name;
      card.description = action.description;
      //auto update cards?
      return cards;
    }
    case types.ADD_COMMENT: {
      let { id, text, authorName, cardId } = action;
      //let id = 1 + +localStorage.getItem("last_id");
      let comment = {
        id,
        text,
        authorName,
        cardId
      };
      let cards = { ...state };
      let card = cards.get("" + cardId);
      card.comments.set("" + id, comment);
      //call boardReducer with { ...action, id }
      return cards;
    }
    case types.DELETE_COMMENT: {
      let cards = { ...state };
      cards.get("" + action.cardId).comments.delete("" + action.id);
      return cards;
    }
    case types.CHANGE_COMMENT: {
      let cards = { ...state };
      let card = cards.get("" + action.cardId).comments.get("" + action.id);
      card.text = action.text;
      return cards;
    }
    //base
    case types.CLEAR: {
      return new Map();
    }
    default: {
      return state;
    }
  }
};

export default cardReducer;
