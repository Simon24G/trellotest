import React from "react";
import Col from "./Col.js";

//ready to check and check phase render
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.id && nextProps.id === this.id) return;
    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    this.id = nextProps.id;
    this.board = JSON.parse(localStorage.getItem("board_" + this.id));
    if (this.board.cols.length === 0) {
      this.board.cols = [
        { name: "TODO" },
        { name: "In Progress" },
        { name: "Testing" },
        { name: "Done" }
      ];
      let id = localStorage.getItem("last_id");
      this.board.cols.forEach(col => {
        id++;
        col.id = id;
        col.cards = [];
        col.BoardId = this.id;
        localStorage.setItem("col_" + id, col);
      });
      localStorage.setItem("last_id", id);
      localStorage.setItem("board_" + this.id, this.board);
    }
    return { cols: this.board.cols };
  }

  render() {
    const { cols } = this.state;

    return (
      <div>
        {cols.map(col => {
          return <Col name={col.name} />;
        })}
      </div>
    );
  }
}

export default Board;
