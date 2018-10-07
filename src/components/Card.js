import React, { Component } from "react";
import Comment from "./Comment.js";

//ready to check and check phase render
//Realise array in HashMap with key id
//  this.card - is it nesseary?(optimization)
class Card extends Component {
  constructor(props) {
    super(props);
    this.close = props.close;
    this.delete = props.delete;
    this.update = props.update;
    this.author = JSON.parse(localStorage.getItem("author"));

    this.id = props.id;
    this.card = JSON.parse(localStorage.getItem("card_" + this.id));
    let comments = this.card.comments;
    this.state = {
      name: this.card.name,
      description: this.card.description,
      colName: props.colName,
      comments: comments
    }; // or to add argument key === 1 || 2 : 1 - set, 2 - =
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.getNewPeaceState(nextProps);
    if (newState !== 0) this.setState(newState);
  }

  getNewPeaceState(nextProps) {
    let state;
    let countState = 0;
    if (this.id && nextProps.id === this.id) {
      state = {};
    } else {
      this.card = JSON.stringify(localStorage.getItem("card_" + nextProps.id));
      let comments = this.card.comments;
      if (!!comments) comments = []; /// is == null || length==0
      this.id = nextProps.id;
      alert(this.id);
      state = {
        name: this.card.name,
        description: this.card.description,
        comments: comments
      };
      countState = 3;
    }
    if (!(this.state.colName && nextProps.colName === this.state.colName)) {
      state.colName = nextProps.colName;
      countState++;
    }

    return countState === 0 ? 0 : state; // i don't found is_empty_object
  }

  addComment = event => {
    event.preventDefault();
    let commentText = this.refs.text.value; //elem.value;

    const nextId = 1 + localStorage.getItem("last_id");
    localStorage.setItem("last_id", nextId);
    const comment = {
      id: nextId,
      text: commentText,
      cardId: this.card.id,
      authorId: this.author.id
    };
    localStorage.setItem("comment_" + nextId, JSON.stringify(comment));

    let author = JSON.parse(localStorage.getItem("author_" + this.author.id));
    author.comments.push({ id: nextId });
    localStorage.setItem("author_" + this.author.id, JSON.stringify(author));

    //let card = JSON.parse(localStorage.getItem("card_" + this.id));
    //запутался
    let card = JSON.parse(localStorage.getItem("card_" + this.card.id));
    card.comments.push({ id: nextId });
    localStorage.setItem("card_" + this.card.id, JSON.stringify(card));

    alert(JSON.stringify(this.state.comments));

    this.setState(prevState => {
      prevState.comments.push(comment);
      return { comments: prevState.comments };
    });
    alert(localStorage.getItem("comment_" + nextId));
    this.update();
    //Stores.commentStore.add(comment) with generated id???
  };
  removeComment = elem => {
    localStorage.removeItem("comment_" + elem.id);

    let author = JSON.parse(localStorage.getItem("author_" + elem.authorId));

    for (let index = 0; index < author.comments.length; index++) {
      if (author.comments[index].id === elem.id) {
        author.comments.splice(index, 1);
        localStorage.setItem("author_" + elem.authorId, JSON.stringify(author));
      }
    }

    for (let index = 0; index < this.card.comments.length; index++) {
      if (this.card.comments[index].id === elem.id) {
        this.card.comments.splice(index, 1); //TODO: CHECK: auto update this.state.comments
        localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
      }
    }

    this.setState(prevState => {
      return { comments: prevState.comments };
    });
    this.update();
  };

  changeContentCard = event => {
    event.preventDefault();
    let card = JSON.parse(localStorage.getItem("card_" + this.id));
    card.description = this.refs.description.value; //elem.value;
    card.name = this.refs.name.value; //elem.value;
    localStorage.setItem("card_" + this.id, JSON.stringify(card));
    alert(JSON.stringify(card));
    this.setState({ description: card.description });
    this.update();
  };

  render() {
    const { name, colName, description, comments } = this.state;
    return (
      <div className="popupCard">
        <p>
          <h>Name col: {colName}</h>
          <h>Author: {this.author.name}</h>
          <button type="button" onClick={this.close}>
            Close
          </button>
          <form onSubmit={this.changeContentCard}>
            <p>Name:</p>
            <input type="text" ref="name" value={name} />
            <p>Description</p>
            <textarea
              rows="5"
              cols="90"
              name="description"
              ref="description"
              value={description}
            />
            <input value="Save" type="submit" />
          </form>
        </p>

        <input type="button" onClick={this.delete} value="Delete Card" />

        {comments.map(comment => {
          return <Comment id={comment.id} removeComment={this.removeComment} />;
        })}

        <form onSubmit={this.addComment}>
          <p>
            <b>Введите ваш комментарий:</b>
          </p>
          <p>
            <textarea rows="5" cols="45" name="text" ref="text" />
          </p>
          <p>
            <input type="submit" value="Оставить" />
          </p>
        </form>
      </div>
    );
  }
}
/*
     <p>
          <form onSubmit={this.changeNameCard}>
            <p>Name</p>
            <input type="text">{name}</input>
            <input value="Ok!" type="submit" />
          </form>
          <h>Name col: {colName}</h>
          <h>Author: {this.author.name}</h>
          <button type="button" onClick={this.close} value="Close" />
        </p>

        <form onSubmit={this.changeDescriptionCard}>
          <p>Description</p>
          <textarea rows="10" cols="45" name="description" ref="description">
            {description}
          </textarea>
          <input value="Ok!" type="submit" />
        </form>
        <input type="button" onClick={this.delete} value="Delete" />

        {comments.map(comment => {
          return <Comment id={comment.id} removeComment={this.removeComment} />;
        })}

        <form action={this.addComment}>
          <p>
            <b>Введите ваш комментарий:</b>
          </p>
          <p>
            <textarea rows="10" cols="45" name="text" />
          </p>
          <p>
            <input type="submit" value="Оставить" />
          </p>
        </form>
   






<textarea rows="10" cols="45" name="description" ref="description">
            {description}
          </textarea>
          
  <button type="submit">Ok!</button>
        
*/
export default Card;
