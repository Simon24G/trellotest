import React, { Component } from "react";
import { logIn } from "/../../api/user-api.js";

class PopupAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  saveName = event => {
    event.preventDefault();
    if (this.state.name === "") return;
    logIn(this.state.name);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.saveName}>
          <div>What's your name?</div>
          <input
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            type="text"
          />
          <input value="LogIn" type="submit" />
        </form>
      </div>
    );
  }
}

export default PopupAnswer;
