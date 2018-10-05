import React from '/lib/node_modules/react';
import ReactDOM from '/lib/node_modules/react-dom';
import Board from '/components/Board';
import PopupAnswer from '/components/PopupAnswer';

//const AuthorContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = (name) => this.saveName(name);
    let author = JSON.parse(localStorage.getItem("author"));
    if(author !== null) {
      this.saveAuthor(author);
    } else {
      this.setState({ 
        answerName: true  
      });
    }
    this.board = JSON.parse(localStorage.getItem("board"));
    if(this.board === null) {
      this.board = {id: 1, name: begin};
      localStorage.setItem("board",JSON.stringify(this.board));
      this.setState({ 
        boardId: this.board  
      });
    }
  }
  saveAuthor(author){
    this.author = author;
    this.setState({ 
      answerName: false,
      boardId: this.board.id,   
      authorName: author.name
    });
  }
  saveName(authorName) {
    let author = {name: authorName};
    localStorage.setItem("author", JSON.stringify(author));
    this.saveAuthor(author);
  }
  render() {
    return (
      <div>
        { () => {
            if(this.state.answerName) {
              return <PopupAnswer saveName={this.saveName}/>; 
            } else {
              return (
                <div>
                  <div> Hello, {this.state.authorName} </div>
                  <Board id = {this.state.boardId}/>
                </div>
                );
            }
          }
        } 
      </div>
    );
  }
}

const placeWeWantToPutComponent = document.getElementById('root');
ReactDOM.render(<App />, placeWeWantToPutComponent);