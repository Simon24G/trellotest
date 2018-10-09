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
    //this.board = JSON.parse(localStorage.getItem("board_" + this.id));
    if (this.board == null || true) {
      //this.board.cols.length === 0) {
      this.board = {};
      this.board.cols = [
        { name: "TODO" },
        { name: "In Progress" },
        { name: "Testing" },
        { name: "Done" }
      ];
      let id = localStorage.getItem("last_id");
      this.board.id = id;
      this.board.cols.forEach(col => {
        id++;
        col.id = id;
        col.cards = [];
        col.BoardId = this.id;
        localStorage.setItem("col_" + id, JSON.stringify(col));
      });
      localStorage.setItem("last_id", id);
      localStorage.setItem("board_" + this.id, JSON.stringify(this.board));
    }
    return { cols: this.board.cols };
  }

  render() {
    const { cols } = this.state;

    return (
      <div>
        <table>
          <col align="center" width="20%" span={cols.length} />
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
