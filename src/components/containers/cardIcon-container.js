import React, { Component } from "react";
import PropTypes from "prop-types";
import CardIcon from "../veiws/cardIcon.js";
import { connect } from "react-redux";

class CardIconContainer extends Component {
  render() {
    return <CardIcon card={this.props.card} />;
  }
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

export default connect(mapStateToProps)(CardIconContainer);
