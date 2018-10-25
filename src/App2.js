import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Board from "./components/views/board.js";
import PopupAnswer from "./components/views/popupAnswer.js";
import CardContainer from "./components/containers/card-container.js";
import { logOut } from "./api/user-api.js";
import { clear } from "./api/base-api.js";

function App(props) {
  const { authorization, isOpenCardModal, authorName, clear, logOut } = props;

  const body = !authorization ? (
    <div>
      {" "}
      Hello
      <PopupAnswer />
    </div>
  ) : (
    <div>
      <div> Hello, {authorName} </div>
      <Board />
    </div>
  );
  const cardModal = isOpenCardModal ? <CardContainer /> : null;
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-primary">
        <h1 className="navbar-brand">Task 1</h1>
        <div
          className="btn-group my-2 my-lg-0"
          role="group"
          aria-label="Basic example"
        >
          <button type="button" onClick={clear} className="btn btn-light">
            Clear
          </button>
          <button type="button" onClick={logOut} className="btn btn-light">
            Log Out
          </button>
        </div>
      </nav>
      {cardModal}
      {body}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    clear: () => dispatch(clear())
  };
};

const mapStateToProps = store => {
  const { author, currentCard } = store.userState;

  const name = author !== null ? author.name : null;
  return {
    authorization: author !== null,
    isOpenCardModal: currentCard.openCard,
    authorName: name
  };
};

App.propTypes = {
  authorization: PropTypes.bool.isRequired,
  isOpenCardModal: PropTypes.bool.isRequired,
  authorName: PropTypes.string,
  logOut: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
