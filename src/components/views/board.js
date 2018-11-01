import React from "react";
import PropTypes from "prop-types";
import Col from "./col.js";
import { connect } from "react-redux";

function Board(props) {
  const { cols } = props;

  const colsComponets = Object.values(cols).map(col => (
    <Col key={col.id} col={col} />
  ));

  return <div className="row">{colsComponets}</div>;
}

const mapStateToProps = store => {
  return {
    cols: store.boardState.cols
  };
};

Board.propTypes = {
  cols: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cards: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          colId: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default connect(mapStateToProps)(Board);
