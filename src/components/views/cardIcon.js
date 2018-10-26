import React from "react";
import PropTypes from "prop-types";
import { openCard } from "../../api/user-api.js";
import { connect } from "react-redux";

function CardIcon(props) {
  const { card, openCard } = props;
  const { name, description, comments } = card;
  const countComments = Object.keys(comments).length;
  return (
    <div>
      <div
        onClick={() => {
          openCard(card.id);
        }}
        className="card text-white bg-success mb-3"
      >
        <div className="card-header">Name card: {name}</div>
        <div className="card-body">
          <h5 className="card-title">Description:</h5>
          <pre className="card-text square scrollbar-cyan bordered-cyan scrollDescriptionCardIcon">
            {description}
          </pre>
        </div>
        <div className="card-footer">Comments: {countComments}</div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    openCard: id => dispatch(openCard(id))
  };
};

const mapStateToProps = (store, ownProps) => {
  return {
    card: store.cardState[ownProps.id.toString()]
  };
};

CardIcon.propTypes = {
  id: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        cardId: PropTypes.number.isRequired
      }).isRequired
    ),
    colId: PropTypes.number.isRequired
  }).isRequired,
  openCard: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardIcon);
