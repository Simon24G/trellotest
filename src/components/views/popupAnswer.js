import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logIn } from "../../api/user-api.js";

class PopupAnswer extends Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  saveName = event => {
    event.preventDefault();
    if (this.state.name === "") return;
    this.props.logIn(this.state.name);
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
const mapDispatchToProps = dispatch => {
  return {
    logIn: name => dispatch(logIn(name))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(PopupAnswer);
