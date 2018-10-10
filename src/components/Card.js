import React, { Component } from "react";
import Comment from "./Comment.js";

//ready to check and check phase render
//Realise array in HashMap with key id
//  this.card - is it nesseary?(optimization)
class Card extends Component {
  constructor(props) {
    super(props);
    this.author = JSON.parse(localStorage.getItem("author"));

    this.id = props.id;
    this.card = JSON.parse(localStorage.getItem("card_" + this.id));
    const author = JSON.parse(
      localStorage.getItem("author_" + this.card.authorId)
    );
    let comments = this.card.comments;
    this.state = {
      name: this.card.name,
      description: this.card.description,
      colName: props.colName,
      authorName: author.name,
      comments: comments
    };
    //aler
    // or to add argument key === 1 || 2 : 1 - set, 2 - =
  }
  close = () => {
    if (this.state.name === "") this.props.delete();
    this.props.close();
  };
  delete = () => {
    this.props.delete();
    this.props.close();
  };

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
      const author = JSON.parse(
        localStorage.getItem("author_" + this.card.authorId)
      );

      let comments = this.card.comments;
      if (!!comments) comments = []; /// is == null || length==0
      this.id = nextProps.id;
      state = {
        name: this.card.name,
        description: this.card.description,
        author: author.name,
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
    if (commentText === "") return;

    const nextId = 1 + +localStorage.getItem("last_id");
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
    let comments = this.state.comments;
    //проверка добавления карточек
    comments.push(comment);
    this.setState({ comments: comments });
    this.props.update();
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
    this.card.comments = this.card.comments.filter(e => e.id !== elem.id);
    localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
    /*
    for (let index = 0; index < this.card.comments.length; index++) {
      if (this.card.comments[index].id === elem.id) {
        this.card.comments.splice(index, 1); //TODO: CHECK: auto update this.state.comments
        localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
      }
    }*/

    this.setState(prevState => {
      return { comments: this.card.comments };
    });
    this.props.update();
  };

  changeContentCard = event => {
    event.preventDefault();
    let card = JSON.parse(localStorage.getItem("card_" + this.id));
    card.description = this.refs.description.value; //elem.value;
    card.name = this.refs.name.value; //elem.value;
    localStorage.setItem("card_" + this.id, JSON.stringify(card));
    this.setState({ description: card.description });
    this.setState({ name: card.name });

    this.props.update();
  };

  render() {
    const { name, colName, description, comments, authorName } = this.state;
    return (
      <div className="PopupCard">
        <p>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Card name: {name}</li>
              <li class="breadcrumb-item"> Col name: {colName} </li>
              <li class="breadcrumb-item active" aria-current="page">
                Author Card name: {authorName}{" "}
              </li>
            </ol>
          </nav>

          <button type="button" onClick={this.close}>
            Close
          </button>
          <form onSubmit={this.changeContentCard}>
            <div className="form-row">
              <div className="col-md-2 mb-1">
                <label for="nameCurrentCard">Name</label>
                <input
                  type="text"
                  ref="name"
                  className="form-control"
                  id="nameCurrentCard"
                  defaultValue={name}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-4">
                <label for="descriptionCurrentCard">Description</label>
                <textarea
                  ref="description"
                  class="form-control"
                  id="descriptionCurrentCard"
                  rows="6"
                  defaultValue={description}
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </p>

        <input type="button" onClick={this.delete} value="Delete Card" />
        <p>
          {comments.map(comment => {
            return (
              <Comment id={comment.id} removeComment={this.removeComment} />
            );
          })}
        </p>

        <form onSubmit={this.addComment}>
          <p>
            <b>Add comment:</b>
          </p>
          <p>
            <textarea rows="5" cols="45" name="text" ref="text" />
          </p>
          <p>
            <input type="submit" value="ok" />
          </p>
        </form>
      </div>
    );
  }
}
/*
          


  <input type="text" name="name" ref="name" /> //Why is nessacery attribute name here?  
            


           <label>
              <input type="text" ref="name" value={name} />
            </label>
            <p>Description</p>
            <input type="text" ref="description" value={description} />
 



<textarea
              rows="5"
              cols="90"
              ref="description"
              value={description}
            />



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
