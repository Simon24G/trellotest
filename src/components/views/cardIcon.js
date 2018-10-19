import React from "react";
import PropTypes from "prop-types";
import { openCard } from "/../api/user-api.js";
import { connect } from "react-redux";

function CardIcon(props) {
  const { card } = props;
  const { name, description, comments } = card;
  const countComments = comments.length;
  return (
    <div>
      <div
        onClick={() => {
          openCard(props.card.id);
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

const mapStateToProps = (store, ownProps) => {
  return {
    card: store.cardState.get("" + ownProps.id)
  };
};

CardIcon.propTypes = {
  id: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
    ).isRequired,
    colId: PropTypes.number.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(CardIcon);
