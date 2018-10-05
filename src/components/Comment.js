import React from "react";

//ready to check and check phase render
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.delete = () => {
      props.removeComment(this.state.comment);
    };
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.id && nextProps.id === this.id) return;
    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    this.id = nextProps.id;
    const comment = JSON.parse(localStorage.getItem("comment_" + this.id));
    this.author = JSON.parse(
      localStorage.getItem("author_" + comment.authorId)
    );
    return { comment: nextProps.comment, authorName: this.author.name };
  }

  updateComment = elem => {
    //this.state.comment.text = elem.value;
    localStorage.setItem(
      "comment_" + this.id,
      JSON.stringify(this.state.comment)
    );
    this.setState(prevState => {
      return { comment: prevState.comment };
    }); //nesseary???
  };
  render() {
    const { authorName, comment } = this.state;

    return (
      <div>
        <p>Author: {authorName}</p>
        <input type="text" onChange={this.updateComment} contenteditable="true">
          <textarea rows="10" cols="45" name="text">
            {comment.text}
          </textarea>
        </input>
        <input type="button" onClick={this.delete} value="X" />
      </div>
    );
  }
}

export default Comment;
