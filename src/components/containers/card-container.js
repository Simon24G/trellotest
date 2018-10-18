import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./card.js";
import Navigate from "../veiws/navigate.js";
import CommentContainer from "./comment-container.js";

import { addCard, changeCard, deleteCard } from "../../api/card-api.js";
import { connect } from "react-redux";

class CardContainer extends Component {
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
        comments: [],
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
    if (nextProps.card.id === this.state.card.id && nextProps.card.id === 0)
      return;

    this.setState(this.getStateFromProps(nextProps));
  }

  saveCard = (name, description) => {
    if (this.state.isCreatePhase) {
      addCard(name, description, this.props.col.id);
    } else {
      changeCard(this.state.id, name, description, this.props.col.id);
    }
  };

  render() {
    const { col, authorName } = this.props;
    const { card, isCreatePhase } = this.state;
    return (
      <Card card={card} saveCard={this.saveCard}>
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
              deleteCard(card.id);
            }}
          >
            Delete Card
          </button>
        )}
        {!isCreatePhase && (
          <CommentContainer key="CommentContainer" cardId={card.id} />
        )}
      </Card>
    );
  }
}

const mapStateToProps = store => {
  let card,
    { id, colId } = store.userState.currentCard.card.id;
  if (id === 0) {
    card = { id, colId };
  } else {
    card = store.boardState.cards.get("" + id);
  }

  return {
    card,
    col: store.boardState.cols.get("" + card.colId),
    authorName: store.userState.author.name
  };
};

CardContainer.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
    ),
    coldId: PropTypes.number.isRequired
  }).isRequired,

  col: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  authorName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(CardContainer);
