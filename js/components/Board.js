import React from '/../../lib/node_modules/react';
import Col from 'Col';

//ready to check and check phase render
export default class Board extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if(this.id && (nextProps.id === this.id)) return;
        this.id = nextProps.id;
        this.board = JSON.parse(localStorage.getItem("board_" + this.id));
        if(this.board.cols.length === 0) {
            this.board.cols = [
                {name: "TODO"},
                {name: "In Progress"},
                {name: "Testing"},
                {name: "Done"}
            ];
            let id = localStorage.getItem("last_id");
            this.board.cols.forEach((col) => {
                id++;
                col.id = id;
                col.cards = [];
                localStorage.setItem("col_" + id, col)
            });
            localStorage.setItem("last_id", id);
            localStorage.setItem("board_" + this.id, this.board)
        }
        this.state = { cols: this.board.cols};
    }
    render() {
      return (
        <div>
          {this.state.cols.map( function(col) {
            return <Col name = {col.name} />;
          })}
        </div>
      );
    }
}