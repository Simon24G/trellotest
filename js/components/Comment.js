import React from '/../../lib/node_modules/react';

//ready to check and check phase render
export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.delete = () => { props.removeComment(this.state.comment) };
        this.update = (elem) => { updateComment(elem) };
    }
    componentWillReceiveProps(nextProps){
        if(this.id && (nextProps.id === this.id)) return;
        this.id = nextProps.id;
        const comment = JSON.parse(localStorage.getItem("comment_" + this.id));
        this.author = JSON.parse(localStorage.getItem("author_" + comment.authorId));
        this.setState({ comment: nextProps.comment, authorName: this.author.name});
    }
    updateComment(elem) {
        //this.state.comment.text = elem.value;
        localStorage.setItem("comment_" + this.id, JSON.stringify(this.state.comment));
        this.setState((prevState) => {
            return {comment: prevState.comment};
        });//nesseary???
    }
    render() {
        return (
            <div>
                <p>Author: {this.state.authorName}</p>
                <input type="text" onChange={this.update} contenteditable="true">
                    <textarea rows="10" cols="45" name="text">{this.state.comment.text}</textarea>
                </input>
                <input type="button" onClick={this.delete} value="X"/>
            </div>
        );
    }
}  