import React from '/lib/node_modules/react';
import ReactDOM from '/lib/node_modules/react-dom';


class Col extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.cards = JSON.stringify(localStorage.getItem("col_" + this.name)).cards;
    if(this.cards.length === 0) {
      this.cards = [
        {name: "1"},
        {name: "2"},
        {name: "3"},
        {name: "4"}
      ];
    }
    this.state = { countCols: this.cards.length,  cards: this.cards};
  }
  render() {
    return (
      <div>
        {this.state.cards.map( function(card) {
          return <Card name = {card.name} />;
        })}
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.card = JSON.stringify(localStorage.getItem("card_" + this.name));
    this.comments = this.card.comments;
    if(this.comments.length === 0) {
      this.comments = [];
    }
    this.state = { countCols: this.comments.length,  comments: this.comments};
  }
  addComment(elem) {
    let commentText = elem.value;
    const comment = {text: commentText, authorId : Global_Author_Name};
    this.card.push(comment);
    localStorage.getItem("card_" + this.name);
    
    
    //?????
    this.setState((prevState) => {
      prevState.comments.push(comment);
      return {comments: prevState.comments};
    });
  }
  removeComment(elem){
    localStorage.removeItem("comment_" + elem.id); 
    this.setState((prevState) => {
      prevState.splice(elem.order, 1);
      return {comments: prevState};
    });   
  }
  render() {
    return (
      <div>
        {this.state.comments.map( function(comment, index) {
          return <Comment id = {comment.id} order={index} removeComment={this.removeComment.bind(this)}/>;
        })}
        <form action={this.addComment.bind(this)}>
          <p><b>Введите ваш комментарий:</b></p>
          <p><textarea rows="10" cols="45" name="text"></textarea></p>
          <p><input type="submit" value="Оставить"/></p>
        </form>
      </div>
    );
  }


  /*
  //На случай модели:
  editComment(elem) {
    //let commentText = elem.text;
    const comment = {id: elem.id, text: elem.text, authorName : elem.authorName};
    localStorage.setItem("comment_" + comment.id, JSON.stringify(comment));
    
    this.setState((prevState) => {
      prevState.comments[elem.order] = comment;
      return {comments: prevState};
    });
  }
  
  {this.state.comments.map( function(comment,index) {
      return <Comment id = {comment.id} order={index} editComment={this.editComment.bind(this)}/>;
  })}
        
  
  */
 
}

//ready to check and check phase render
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.removeComment = props.removeComment;
    const comment = JSON.stringify(localStorage.getItem("comment_" + this.id));
    this.author = JSON.stringify(localStorage.getItem("author_" + comment.authorId));
    this.state = { comment: comment, authorName: this.author.name};
  }
  
  updateComment(elem) {
    //elem.value;
    localStorage.setItem("comment_" + this.id, JSON.stringify(this.state.comment));
    this.setState((prevState) => {
      return {comment: prevState.comment};
    });//nesseary???
  }
  delete() {
    this.removeComment(this.state.comment);
  }
  render() {
    return (
      <div>
        <p>Author: {this.state.authorName}</p>
        <input type="text" onChange={this.updateComment.bind(this)} contenteditable="true">
          <textarea rows="10" cols="45" name="text">{this.state.comment.text}</textarea>
        </input>
        <input type="button" onClick={this.delete.bind(this)} value="X"/>
      </div>
    );
  }
  /*
  Model:
  <p>Author: {this.state.comment.author}</p>  
  <p>
  <input value="Edit" onClick={} type="button"/>
  </p>

  */
}


class PopupAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = props.saveName;
  }
  readName(elem){
    this.saveName(elem.name.value);
  }
  render() {
    return (
      <div>
        <form action={this.readName}>
          <div>Как вас звать?</div>
          <input name="name" type="text"/>
          <input type="submit">Вот он я!</input>
        </form> 
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.cols = JSON.stringify(localStorage.getItem("board_" + this.name)).cols;
    if(this.cols.length === 0) {
      this.cols = [
        {name: "TODO"},
        {name: "In Progress"},
        {name: "Testing"},
        {name: "Done"}
      ];
    }
    this.state = { countCols: this.cols.length,  cols: this.cols};
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




class App extends React.Component {
  constructor(props) {
    super(props);
    let author = JSON.stringify(localStorage.getItem("author"));
    if(author !== null) {
      this.saveAuthor(author);
    } else {
      this.setState(() => {
        return { 
          answerName: true  
        };
      });
    }
  }
  saveAuthor(author){
    this.author = author;
    this.setState({ 
      answerName: false,
      boardName: author.boardName,   
      authorName: author.name
    });
  }
  saveName(authorName) {
    let author = {name: authorName, boardName: 1};
    localStorage.setItem("author_" + authorName, JSON.stringify(author));
    this.saveAuthor(author);
  };
  render() {
    return (
      <div>
        { () => {
            if(this.state.answerName) {
              return <PopupAnswer saveName={this.saveName.bind(this)}/>; 
            } else {
              return (
                <div>
                  <div> Hello, {this.state.authorName} </div>
                  <Board name = {this.state.boardName}/>
                </div>
                );
            }
          }
        } 
      </div>
    );
  }
}
/*
  <buttom onClick={}></buttom>
*/

/*<PlayButton 
          onClick={this.handleClick.bind(this)} 
          isMusicPlaying={this.state.isMusicPlaying} 
        />
        <audio id="audio" />*/
     