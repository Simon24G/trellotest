import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Board from "/components/veiws/board.js";
import PopupAnswer from "/components/veiws/popupAnswer.js";
import CardContainer from "/components/containers/card-container.js";
import { logOut } from "/api/user-api.js";
import { clear } from "/api/base-api.js";
import { Provider } from "react-redux";
import store from "./store.js";
function App() {
  const { authorization, isOpenCardModal, authorName } = this.props;

  const body = authorization ? (
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
    <Provider store={store}>
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
    </Provider>
  );
}

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
  authorName: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);
