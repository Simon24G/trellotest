import { combineReducers } from "redux";

import boardReducers from "./board-reducer.js";
import cardReducers from "./card-reducer.js";

var reducers = combineReducers({
  boardState: boardReducers,
  cardState: cardReducers
});

export default reducers;
