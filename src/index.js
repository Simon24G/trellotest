import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App2.js";
import store from "./store.js";

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
