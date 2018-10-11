import React from "react";

//ready to check and check phase render
class Comment extends React.Component {
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
        textComment: prevState.comment.text,
        comment: prevState.comment
      };
    });
  };
  render() {
    const { authorName, textComment } = this.state;
    return (
      <div>
        <p>Author: {authorName}</p>
        <form onSubmit={this.updateComment}>
          <textarea
            rows="5"
            cols="55"
            defaultValue={textComment}
            onChange={this.commentChange}
          />
          <p>
            <button type="submit">save change</button>
            {"      "}
            <input type="button" onClick={this.delete} value="X" />
          </p>
        </form>
      </div>
    );
  }
}

export default Comment;
