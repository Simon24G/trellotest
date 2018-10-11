import React from "react";
import Col from "./Col.js";

class Board extends React.Component {
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
    if (board == null) {
      board = {};
      board.cols = [
        { name: "TODO" },
        { name: "In Progress" },
        { name: "Testing" },
        { name: "Done" }
      ];
      let id = localStorage.getItem("last_id");
      board.id = id;
      board.cols.forEach(col => {
        id++;
        col.id = id;
        col.cards = [];
        col.BoardId = nextProps.id;
        localStorage.setItem("col_" + id, JSON.stringify(col));
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
      <div>
        <table>
          <col align="center" span={cols.length} />
          {cols.map(col => {
            return (
              <td>
                <Col id={col.id} />
              </td>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Board;
