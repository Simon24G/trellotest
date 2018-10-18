import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContainer from "./card-container.js";
import CardIcon from "../veiws/cardIcon.js";

import { connect } from "react-redux";

class CardIconContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCard: false
    }; //перенести в configState в store
  }
  open = () => {
    this.setState({
      isOpenCard: true
    });
  };
  close = () => {
    this.setState({
      isOpenCard: false
    });
  };

  render() {
    const { isOpenCard } = this.state;
    return (
      <CardIcon card={this.props.card} open={this.open}>
        {isOpenCard && (
          <CardContainer card={this.props.card} close={this.close} />
        )}
      </CardIcon>
    );
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
