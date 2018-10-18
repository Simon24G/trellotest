import { combineReducers } from "redux";

import boardReducer from "./board-reducer.js";
import cardReducer from "./card-reducer.js";
import userReducer from "./user-reducer.js";

var reducers = combineReducers({
  boardState: boardReducer,
  cardState: cardReducer,
  userState: userReducer
});

export default reducers;
