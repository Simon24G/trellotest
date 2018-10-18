import React from "react";
import PropTypes from "prop-types";
import Col from "./col.js";
import { connect } from "react-redux";

function Board(props) {
  const { cols } = props;

  return (
    <div className="row">
      {cols.map(col => {
        return <Col key={col.id} id={col.id} />;
      })}
    </div>
  );
}

const mapStateToProps = store => {
  return {
    cols: store.boardState.cols
  };
};

Board.propTypes = {
  id: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Board);
