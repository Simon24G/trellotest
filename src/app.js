import React from "react";
import Board from "./components/Board.js";
import PopupAnswer from "./components/PopupAnswer.js";

//const AuthorContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    localStorage.clear();
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
    return <div>{element}</div>;
  }
}

export default App;
/*
        





const placeWeWantToPutComponent = document.getElementById("root");
ReactDOM.render(<App />, placeWeWantToPutComponent);*/
