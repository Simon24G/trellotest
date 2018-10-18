import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "../veiws/card.js";

import { addComment } from "../../api/comment-api.js";
import { connect } from "react-redux";

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { textComment: "" };
  }

  saveComment = e => {
    e.preventDefault();
    addComment(
      this.state.textComment,
      this.props.authorName,
      this.props.cardId
    );
  };

  render() {
    const comments = this.props.comments;
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
        {comments.length > 0 && (
          <div>
            <p>
              <b>Comments:</b>
            </p>
            <div>
              {comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store, oneProps) => {
  return {
    comments: store.cardState.get("" + oneProps.cardId).comments,
    authorName: store.userState.author.name
  };
};

CommentContainer.propTypes = {
  cardId: PropTypes.number,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      cardId: PropTypes.number.isRequired
    })
  ).isRequired,

  authorName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(CommentContainer);
