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
    this.state = this.getNewPeaceState(props);
    // or to add argument key === 1 || 2 : 1 - set, 2 - =
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.getNewPeaceState(nextProps);
    if (newState !== 0)
      this.setState({
        name: this.card.name,
        description: this.card.description,
        comments: this.card.comments
      });
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

  addComment = elem => {
    let commentText = elem.value;
    const nextId = localStorage.getItem("last_id") + 1;
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
    localStorage.setItem("last_id", nextId);

    this.card.comments.push({ id: nextId }); // auto update this.state.comments
    localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
    this.setState(prevState => {
      return { comments: prevState.comments };
    });
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
  /*
    changeNameCard = (elem) => {
        ...
    }
    */
  changeNameCard = elem => {
    let card = JSON.parse(localStorage.getItem("card_" + this.id));
    card.name = elem.value;
    localStorage.setItem("card_" + this.id, JSON.stringify(card));
    this.setState({ name: card.name });
    this.update();
  };
  changeDescriptionCard = elem => {
    let card = JSON.parse(localStorage.getItem("card_" + this.id));
    card.description = elem.value;
    localStorage.setItem("card_" + this.id, JSON.stringify(card));
    this.setState({ description: card.description });
    this.update();
  };

  render() {
    const { name, colName, description, comments } = this.state;

    return (
      <div className="popupCard">
        <p>
          <form action={this.changeNameCard}>
            <h>{name}</h>
          </form>
          <h>Name col: {colName}</h>
          <h>Author: {this.author.name}</h>
          <input type="button" onClick={this.close} value="Close" />
        </p>

        <form action={this.changeDescriptionCard}>
          <textarea rows="10" cols="45" name="text">
            {description}
          </textarea>
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
      </div>
    );
  }
}

export default Card;
