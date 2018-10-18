import React from "react";
import PropTypes from "prop-types";

function CardIcon(props) {
    const { card, open } = props;
    const { name, description, comments } = card;
    const countComments = comments.length;
    return (
      <div>
        <div onClick={open} className="card text-white bg-success mb-3">
          <div className="card-header">Name card: {name}</div>
          <div className="card-body">
            <h5 className="card-title">Description:</h5>
            <pre className="card-text square scrollbar-cyan bordered-cyan scrollDescriptionCardIcon">
              {description}
            </pre>
          </div>
          <div className="card-footer">Comments: {countComments}</div>
        </div>
        {props.children}
      </div>
    );
  }
}

CardIcon.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  open: PropTypes.func.isRequired
};

export default CardIcon;
