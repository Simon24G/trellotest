import React, { Component } from "react";
import PropTypes from "prop-types";
import { changeComment, deleteComment } from "../../api/comment-api";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { textComment: this.props.comment.text, id: this.comment.id };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.comment.id === nextProps.comment.id) return;
    //смещать id редактируемого коммента
    this.setState({
      textComment: nextProps.comment.text,
      regim: false
    });
  }

  updateComment = e => {
    e.preventDefault();
    const { id, cardId } = this.props.comment;
    changeComment(id, this.state.textComment, cardId);
    this.setState(prevState => {
      return {
        regim: false,
        textComment: prevState.comment.text,
        comment: prevState.comment
      };
    });
  };
  delete = e => {
    e.preventDefault();
    const { id, cardId } = this.props.comment;
    deleteComment(id, cardId);
  };
  edit = () => {
    this.setState({
      regim: true
    });
  };
  //problem при удалении комментариев во время редактирования может сместиться id редактируемого
  render() {
    const { textComment, regim } = this.state;
    return (
      <div>
        <p>Author: {this.props.comment.authorName}</p>
        {regim ? (
          <form onSubmit={this.updateComment}>
            <textarea
              rows="5"
              cols="55"
              value={textComment}
              onChange={e => {
                this.setState({ textComment: e.target.value });
              }}
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
            <pre className="comment">{this.props.comment.text}</pre>
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
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired
  }).isRequired
};

export default Comment;
