import React, { Component } from "react";
import Board from "./components/Board.js";
import PopupAnswer from "./components/PopupAnswer.js";

class App extends Component {
  constructor(props) {
    super(props);
    let author = JSON.parse(localStorage.getItem("author"));
    let state = {};
    if (author !== null) {
      state.answerName = false;
      state.boardId = 1;
      state.authorName = author.name;
    } else {
      state.answerName = true;
    }

    let boardJSON = localStorage.getItem("board");
    let board;
    if (boardJSON == null || typeof undefined === "undefined") {
      board = { id: 1, name: "begin" };
      localStorage.setItem("board", JSON.stringify(state.board));
      state.boardId = board;
    } else {
      board = JSON.parse(boardJSON);
    }

    this.state = state;
  }
  saveAuthor(author) {
    this.setState({
      answerName: false,
      boardId: 1,
      authorName: author.name
    });
  }
  saveName = authorName => {
    let nextId = +localStorage.getItem("last_id") + 1;
    localStorage.setItem("last_id", nextId);
    let author = { name: authorName, id: nextId, comments: [], cards: [] };

    localStorage.setItem("author", JSON.stringify(author));
    localStorage.setItem("author_" + nextId, JSON.stringify(author));

    this.saveAuthor(author);
  };
  clear = () => {
    localStorage.clear();
    this.setState({
      answerName: true,
      boardId: 1
    });
  };
  logOut = () => {
    localStorage.removeItem("author");
    this.setState({
      answerName: true,
      boardId: 1
    });
  };

  render() {
    this.idc++;
    const { answerName, boardId, authorName } = this.state;
    const element = answerName ? (
      <div>
        {" "}
        Hello
        <PopupAnswer saveName={this.saveName} />
      </div>
    ) : (
      <div>
        <div> Hello, {authorName} </div>
        <Board id={boardId} />
      </div>
    );
    return (
      <div>
        <nav className="navbar fixed-top navbar-dark bg-primary">
          <h1 className="navbar-brand">Task 1</h1>
          <div
            className="btn-group my-2 my-lg-0"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              onClick={this.clear}
              className="btn btn-light"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={this.logOut}
              className="btn btn-light"
            >
              Log Out
            </button>
          </div>
        </nav>
        {element}
      </div>
    );
  }
}

export default App;
