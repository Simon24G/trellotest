import React, { Component } from "react";
import Comment from "./Comment.js";

class Card extends Component {
  constructor(props) {
    super(props);
    this.author = JSON.parse(localStorage.getItem("author"));
    if (+props.id > 0) {
      let card = JSON.parse(localStorage.getItem("card_" + props.id));
      const author = JSON.parse(
        localStorage.getItem("author_" + card.authorId)
      );
      let comments = card.comments;
      this.state = {
        id: props.id,
        name: card.name,
        description: card.description,
        colName: props.colName,
        authorName: author.name,
        comments: comments
      };
    } else {
      const author = JSON.parse(localStorage.getItem("author"));
      this.state = {
        card: {},
        id: 0,
        name: "",
        description: "",
        colName: props.colName,
        authorName: author.name,
        comments: []
      };
    }
  }
  //aler
  // or to add argument key === 1 || 2 : 1 - set, 2 - =
  close = () => {
    if (this.state.name === "" && this.state.id !== 0) this.props.delete();
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
    if (this.state.id && nextProps.id === this.state.id) {
      state = {};
    } else {
      let card = JSON.stringify(localStorage.getItem("card_" + nextProps.id));
      const author = JSON.parse(
        localStorage.getItem("author_" + card.authorId)
      );

      let comments = card.comments;
      if (!!comments) comments = []; /// is == null || length==0
      state = {
        id: nextProps.id,
        name: card.name,
        description: card.description,
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

    const nextId = 1 + +localStorage.getItem("last_id");
    localStorage.setItem("last_id", nextId);
    const comment = {
      id: nextId,
      text: this.state.textComment,
      cardId: this.state.id,
      authorId: this.author.id
    };
    localStorage.setItem("comment_" + nextId, JSON.stringify(comment));

    let card = JSON.parse(localStorage.getItem("card_" + this.state.id));
    card.comments.push({ id: nextId });
    localStorage.setItem("card_" + this.state.id, JSON.stringify(card));
    let comments = this.state.comments;
    //проверка добавления карточек
    comments.push(comment);
    this.setState({ comments: comments });
    this.props.update();
    //Stores.commentStore.add(comment) with generated id???
  };
  removeComment = elem => {
    localStorage.removeItem("comment_" + elem.id);

    let card = JSON.parse(localStorage.getItem("card_" + this.state.id));
    card.comments = card.comments.filter(e => e.id !== elem.id);
    localStorage.setItem("card_" + this.state.id, JSON.stringify(card));

    this.setState({ comments: card.comments });
    this.props.update();
  };

  changeContentCard = event => {
    event.preventDefault();
    let card,
      id = this.state.id;
    let flag = false;
    if (this.state.id === 0) {
      id = +localStorage.getItem("last_id") + 1;
      localStorage.setItem("last_id", id);
      let authorId = JSON.parse(localStorage.getItem("author")).id;
      this.setState({ id: id });
      card = {
        id: id,
        comments: [],
        authorId: authorId
      };
      flag = true;
    } else {
      card = JSON.parse(localStorage.getItem("card_" + id));
      if (
        card.description === this.state.description &&
        card.name === this.state.name
      )
        return;
    }
    card.description = this.state.description;
    card.name = this.state.name;
    localStorage.setItem("card_" + id, JSON.stringify(card));
    if (flag) {
      this.props.eventCreateCard(id);
    } else {
      this.props.update();
    }
  };

  descriptionChange = e => {
    let text = e.target.value;
    this.setState({ description: text });
  };
  nameChange = e => {
    let text = e.target.value;
    this.setState({ name: text });
  };
  textCommentChange = e => {
    let text = e.target.value;
    this.setState({ textComment: text });
  };
  render() {
    const { name, colName, description, comments, authorName, id } = this.state;
    const textComment = !!this.state.textComment ? this.state.textComment : "";
    return (
      <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">Card name: {name}</li>
                    <li class="breadcrumb-item"> Col name: {colName} </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Author Card name: {authorName}{" "}
                    </li>
                  </ol>
                </nav>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <form onSubmit={this.changeContentCard}>
                  <div className="form-row">
                    <div className="col-md-2 mb-1">
                      <label for="nameCurrentCard">Name</label>
                      <input
                        type="text"
                        onChange={this.nameChange}
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
                        onChange={this.descriptionChange}
                        class="form-control"
                        id="descriptionCurrentCard"
                        rows="6"
                        defaultValue={description}
                        required
                      />
                    </div>
                  </div>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button className="btn btn-primary" type="submit">
                      Save
                    </button>
                    {id !== 0 && (
                      <button className="btn btn-danger" onClick={this.delete}>
                        Delete Card
                      </button>
                    )}
                  </div>
                </form>
              </p>
              {id !== 0 && (
                <div>
                  <p>
                    <b>Comments:</b>
                  </p>
                  <p className="scrollComment">
                    {comments.map(comment => {
                      return (
                        <Comment
                          key={comment.id}
                          id={comment.id}
                          removeComment={this.removeComment}
                        />
                      );
                    })}
                  </p>
                  <form onSubmit={this.addComment}>
                    <p>
                      <b>Add comment:</b>
                    </p>
                    <p>
                      <textarea
                        rows="5"
                        cols="55"
                        onChange={this.textCommentChange}
                        required
                      >
                        {textComment}
                      </textarea>
                    </p>
                    <p>
                      <input type="submit" value="ok" />
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
