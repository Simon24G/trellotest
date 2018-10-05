import React from "react";
import Board from "./components/Board.js";
import PopupAnswer from "./components/PopupAnswer.js";

//const AuthorContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    let author = JSON.parse(localStorage.getItem("author"));
    let state;
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
      boardId: this.board.id,
      authorName: author.name
    });
  }
  saveName = authorName => {
    let author = { name: authorName };
    localStorage.setItem("author", JSON.stringify(author));
    this.saveAuthor(author);
  };
  render() {
    const { answerName, boardId, authorName } = this.state;

    return (
      <div>
        {() => {
          if (answerName) {
            return <PopupAnswer saveName={this.saveName} />;
          } else {
            return (
              <div>
                <div> Hello, {authorName} </div>
                <Board id={boardId} />
              </div>
            );
          }
        }}
      </div>
    );
  }
}

export default App;
/*const placeWeWantToPutComponent = document.getElementById("root");
ReactDOM.render(<App />, placeWeWantToPutComponent);*/
