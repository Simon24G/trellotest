import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "../views/card.js";

import {
  addComment,
  changeComment,
  deleteComment
} from "../../api/comment-api.js";

import { connect } from "react-redux";

class CommentContainer extends Component {
  static propTypes = {
    cardId: PropTypes.number,
    comments: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        cardId: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    authorName: PropTypes.string.isRequired,

    addComment: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { textComment: "" };
  }

  saveComment = e => {
    e.preventDefault();
    this.props.addComment(
      this.state.textComment,
      this.props.authorName,
      this.props.cardId
    );
  };

  render() {
    const { comments, changeComment, deleteComment } = this.props;

    let commentsComponets = [];
    for (var key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsComponets.push(
          <Comment
            key={comments[key].id}
            comment={comments[key]}
            changeComment={changeComment}
            deleteComment={deleteComment}
          />
        );
      }
    }

    return (
      <div>
        <form onSubmit={this.saveComment}>
          <p>
            <b>Add comment:</b>
          </p>
          <textarea
            rows="5"
            cols="55"
            onChange={e => {
              this.setState({ textComment: e.target.value });
            }}
            value={this.state.textComment}
            required
          />
          <button type="submit" className="btn btn-info">
            OK
          </button>
        </form>
        {commentsComponets.length > 0 && (
          <div>
            <p>
              <b>Comments:</b>
            </p>
            <div>{commentsComponets}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (text, authorName, cardId) =>
      dispatch(addComment(text, authorName, cardId)),
    changeComment: (id, text, cardId) =>
      dispatch(changeComment(id, text, cardId)),
    deleteComment: (id, cardId) => dispatch(deleteComment(id, cardId))
  };
};

const mapStateToProps = (store, oneProps) => {
  return {
    comments: store.cardState[oneProps.cardId.toString()].comments,
    authorName: store.userState.author.name
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContainer);
