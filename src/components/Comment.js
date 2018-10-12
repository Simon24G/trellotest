import React, { Component } from "react";
import PropTypes from "prop-types";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.id && nextProps.id === this.state.id) return;

    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    const comment1 = JSON.parse(
      localStorage.getItem("comment_" + nextProps.id)
    );
    this.delete = () => {
      nextProps.removeComment(comment1);
    };
    this.author = JSON.parse(
      localStorage.getItem("author_" + comment1.authorId)
    );
    return {
      id: nextProps.id,
      textComment: comment1.text,
      comment: comment1,
      authorName: this.author.name
    };
  }
  commentChange = e => {
    this.setState({ textComment: e.target.value });
  };
  updateComment = e => {
    e.preventDefault();
    let comment = this.state.comment;
    comment.text = this.state.textComment;
    localStorage.setItem(
      "comment_" + this.state.id,
      JSON.stringify(this.state.comment)
    );
    this.setState(prevState => {
      return {
        regim: false,
        textComment: prevState.comment.text,
        comment: prevState.comment
      };
    });
  };
  edit = () => {
    this.setState({
      regim: true
    });
  };
  render() {
    const { authorName, textComment, regim } = this.state;
    //const regim = { action: this.action };
    return (
      <div>
        <p>Author: {authorName}</p>
        {regim ? (
          <form onSubmit={this.updateComment}>
            <textarea
              rows="5"
              cols="55"
              value={textComment}
              onChange={this.commentChange}
            />
            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-primary" type="submit">
                save change
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.delete}
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <div>
            <pre className="comment">{textComment}</pre>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-primary" onClick={this.edit}>
                edit
              </button>
              <button className="btn btn-danger" onClick={this.delete}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Comment.propTypes = {
  removeComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Comment;
