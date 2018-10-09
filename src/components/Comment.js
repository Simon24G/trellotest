import React from "react";

//ready to check and check phase render
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.id && nextProps.id === this.id) return;
    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    this.id = nextProps.id;
    const comment1 = JSON.parse(localStorage.getItem("comment_" + this.id));
    this.delete = () => {
      nextProps.removeComment(comment1);
    };
    this.author = JSON.parse(
      localStorage.getItem("author_" + comment1.authorId)
    );
    return { comment: comment1, authorName: this.author.name };
  }

  updateComment = e => {
    e.preventDefault();
    const text = this.refs.text;
    //no cool
    let comment = this.state;
    comment.text = text;
    //alert(this.state.comment.text);
    localStorage.setItem(
      "comment_" + this.id,
      JSON.stringify(this.state.comment)
    );
    this.setState(prevState => {
      prevState.comment.text = text;
      return { comment: prevState.comment };
    }); //nesseary???
  };
  render() {
    const { authorName, comment } = this.state;
    return (
      <div>
        <p>Author: {authorName}</p>
        <form onSubmit={this.updateComment}>
          <textarea rows="5" cols="25" ref="text" defaultValue={comment.text} />
          <button type="submit" value="save comment" />
        </form>
        <input type="button" onClick={this.delete} value="X" />
      </div>
    );
  }
}

export default Comment;
/*
        
<form>
          <p>{comment.text}</p>
          <textarea
            rows="5"
            cols="25"
            name="text"
            onChange={this.updateComment}
          >
            {comment.text}
          </textarea>
        </form>
        



<form>
          <input type="text" onChange={this.updateComment}>
            <textarea
              rows="10"
              cols="45"
              name="text"
              contenteditable="true"
              onChange={this.updateComment}
            >
              {comment.text}
            </textarea>
          </input>
        </form>
        

*/
