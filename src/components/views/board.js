import React from "react";
import PropTypes from "prop-types";
import Col from "./col.js";
import { connect } from "react-redux";

function Board(props) {
  const { cols } = props;

  return (
    <div className="row">
      {cols.map(col => {
        console.log("Col before put newProps " + col.name);
        console.log("key: ", col.id);
        console.log("col: ", col);
        console.log("_________________________________________");
        return <Col key={col.id} col={col} />;
      })}
    </div>
  );
}

const mapStateToProps = store => {
  console.log("Store: ", store);

  return {
    cols: Array.from(store.boardState.cols.values())
  };
};

Board.propTypes = {
  cols: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cards: PropTypes.objectOf.isRequired
    })
  ).isRequired
};

export default connect(mapStateToProps)(Board);
