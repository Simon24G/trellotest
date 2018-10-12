import React, { Component } from "react";
import PropTypes from "prop-types";
import Col from "./Col.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.id && nextProps.id === this.state.id) return;
    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    let board = JSON.parse(localStorage.getItem("board_" + nextProps.id));
    if (board === null) {
      board = {};

      let id = +localStorage.getItem("last_id");
      board.id = id;
      let cols = [
        { name: "TODO" },
        { name: "In Progress" },
        { name: "Testing" },
        { name: "Done" }
      ];
      board.cols = [];
      cols.forEach(col => {
        id++;
        col.id = id;
        col.cards = [];
        col.BoardId = nextProps.id;
        board.cols.push({ id: col.id });
        localStorage.setItem("col_" + col.id, JSON.stringify(col));
      });

      localStorage.setItem("last_id", id);
      localStorage.setItem("board_" + nextProps.id, JSON.stringify(board));
      localStorage.setItem("board", JSON.stringify(board));
    }
    return { cols: board.cols };
  }

  render() {
    const { cols } = this.state;

    return (
      <div className="row">
        {cols.map(col => {
          return <Col key={col.id} id={col.id} />;
        })}
      </div>
    );
  }
}

Board.propTypes = {
  id: PropTypes.number.isRequired
};

export default Board;
