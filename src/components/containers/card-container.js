import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../views/card";
import Navigate from "../views/navigate.js";
import CommentContainer from "./comment-container.js";

import { addCard, changeCard, deleteCard } from "../../api/card-api.js";
import { closeCard } from "../../api/user-api.js";

import { connect } from "react-redux";

class CardContainer extends Component {
  static propTypes = {
    card: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      comments: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          authorName: PropTypes.string.isRequired,
          cardId: PropTypes.number.isRequired
        }).isRequired
      ),
      coldId: PropTypes.number
    }).isRequired,

    col: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    authorName: PropTypes.string.isRequired,

    addCard: PropTypes.func.isRequired,
    changeCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    closeCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(nextProps) {
    const isCreatePhase = nextProps.card.id === 0;
    let card;
    if (isCreatePhase) {
      card = {
        id: 0,
        name: "",
        description: "",
        comments: {},
        colId: nextProps.col.id
      };
    } else {
      card = nextProps.card;
    }
    return {
      card,
      isCreatePhase
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card.id === 0) return;
    this.setState(this.getStateFromProps(nextProps));
  }

  saveCard = (name, description) => {
    if (this.state.isCreatePhase) {
      this.props.addCard(name, description, this.props.col.id);
    } else {
      this.props.changeCard(
        this.state.card.id,
        name,
        description,
        this.props.col.id
      );
    }
  };

  render() {
    const { col, authorName, deleteCard, closeCard } = this.props;
    const { card, isCreatePhase } = this.state;
    return (
      <Card
        card={card}
        col={col}
        authorName={authorName}
        saveCard={this.saveCard}
        closeCard={closeCard}
      >
        <Navigate
          key="Navigate"
          name={card.name}
          colName={col.name}
          authorName={authorName}
        />
        {!isCreatePhase && (
          <button
            key="ButtonDelete"
            className="btn btn-danger"
            onClick={() => {
              deleteCard(card.id, card.colId);
            }}
          >
            Delete Card
          </button>
        )}
        {!isCreatePhase && (
          <CommentContainer
            key="CommentContainer"
            cardId={card.id}
            comments={card.comments}
          />
        )}
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: (name, description, colId) =>
      dispatch(addCard(name, description, colId)),
    changeCard: (id, name, description, colId) =>
      dispatch(changeCard(id, name, description, colId)),
    deleteCard: (id, colId) => dispatch(deleteCard(id, colId)),
    closeCard: () => dispatch(closeCard())
  };
};

const mapStateToProps = store => {
  let card,
    { id, colId } = store.userState.currentCard.card;
  if (id === 0) {
    card = { id, colId };
  } else {
    if (!(id.toString() in store.cardState)) closeCard();
    card = store.cardState[id.toString()];
  }

  return {
    card,
    col: store.boardState.cols[card.colId.toString()],
    authorName: store.userState.author.name
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
