import React from "react";
import Board from "./components/Board.js";
import PopupAnswer from "./components/PopupAnswer.js";

//const AuthorContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    let author = JSON.parse(localStorage.getItem("author"));
    let state = {};
    if (author !== null) {
      this.saveAuthor(author);
    } else {
      state.answerName = true;
    }
    this.board = JSON.parse(localStorage.getItem("board"));
    if (this.board === null) {
      this.board = { id: 1, name: "begin" };
      localStorage.setItem("board", JSON.stringify(this.board));
      state.boardId = this.board;
    }

    this.state = state;
  }
  saveAuthor(author) {
    this.author = author;
    this.setState({
      answerName: false,
      boardId: 1,
      authorName: author.name
    });
  }
  saveName = authorName => {
    let nextId = localStorage.getItem("last_id") + 1;
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
    //alert(answerName);
    return (
      <div>
        <nav class="navbar fixed-top navbar-dark bg-primary">
          <h class="navbar-brand">Task 1</h>
          <div
            class="btn-group my-2 my-lg-0"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" onClick={this.clear} class="btn btn-light">
              Clear
            </button>
            <button type="button" onClick={this.logOut} class="btn btn-light">
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
/*
        





const placeWeWantToPutComponent = document.getElementById("root");
ReactDOM.render(<App />, placeWeWantToPutComponent);*/
