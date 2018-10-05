import React from '/../../lib/node_modules/react';
import Comment from 'Comment';

//ready to check and check phase render
//Realise array in HashMap with key id
//  this.card - is it nesseary?(optimization)
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.changeCountComment = props.changeCountComment;
        this.close = props.close;
        this.delete = props.delete;
        this.update = props.update;

        this.changeNameCard = (elem) => this.changeNameCard(elem);
        this.changeDescriptionCard = (elem) => this.changeDescriptionCard(elem);
        this.deleteComment = (elem) => { this.removeComment(elem) };
        this.add = (elem) => { this.addComment(elem) };
        this.author = JSON.parse(localStorage.getItem("author"));
    }
    componentWillReceiveProps(nextProps){
        this.setState({colName: nextProps.colName});
        if(this.id && (nextProps.id === this.id)) return;    
        this.card = JSON.stringify(localStorage.getItem("card_" + nextProps.id));
        let comments = this.card.comments;
        if(!!comments) comments = [];/// is == null || length==0
        this.setState({name: this.card.name, description: this.card.description, comments: comments}); 
    }
    addComment(elem){
        this.changeCountComment(1);
        let commentText = elem.value;
        const nextId = localStorage.getItem("last_id") + 1;
        const comment = {
            id: nextId,
            text: commentText, 
            cardId : this.card.id,
            authorId : this.author.id
        };
        localStorage.setItem("comment_" + nextId, JSON.stringify(comment));
        
        let author = JSON.parse(localStorage.getItem("author_" + this.author.id));
        author.comments.push({id: nextId});
        localStorage.setItem("author_" + Global_Author.id, JSON.stringify(author));
        
        //let card = JSON.parse(localStorage.getItem("card_" + this.id));
        localStorage.setItem("last_id", next_id);

        this.card.comments.push({id: nextId}); // auto update this.state.comments
        localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
        this.setState((prevState) => {
            return {comments: prevState.comments};
        });
        //Stores.commentStore.add(comment) with generated id???
    }
    removeComment(elem){
        localStorage.removeItem("comment_" + elem.id); 
        this.changeCountComment(-1);
    
        let author = JSON.parse(localStorage.getItem("author_" + elem.authorId));
        
        for(let index = 0; index < author.comments.length; index++){
            if(author.comments[index].id == elem.id){
                author.comments.splice(index, 1);
                localStorage.setItem("author_" + elem.authorId, JSON.stringify(author));
            }
        }
        
        for(let index = 0; index < this.card.comments.length; index++){
            if(this.card.comments[index].id == elem.id){
                this.card.comments.splice(index, 1);  //TODO: CHECK: auto update this.state.comments
                localStorage.setItem("card_" + this.card.id, JSON.stringify(this.card));
            }
        }
       
        this.setState((prevState) => {
           return {comments: prevState.comments};
        });   
    }
    /*
    changeNameCard = (elem) => {
        ...
    }
    */
    changeNameCard(elem){
        let card = JSON.parse(localStorage.getItem("card_" + this.id));
        card.name = elem.value;
        localStorage.setItem("card_" + this.id, JSON.stringify(card));
        this.setState({name: card.name});
        this.update();
    }
    changeDescriptionCard(elem){
        let card = JSON.parse(localStorage.getItem("card_" + this.id));
        card.description = elem.value;
        localStorage.setItem("card_" + this.id, JSON.stringify(card));
        this.setState({description: card.description});
        this.update();
    }
      
    render(){
        return (
        <div className="popupCard">
            <p>
                <form action={this.changeNameCard}>
                        <h>{this.state.name}</h>
                </form>
                <h>Name col: {this.state.colName}</h>
                <h>Author: {this.author.id}</h>
                <input type="button" onClick={this.close} value="Close"/>
            </p>
            
            <form action={this.changeDescriptionCard}>
              <textarea rows="10" cols="45" name="text">{this.state.description}</textarea>
            </form>
            <input type="button" onClick={this.delete} value="Delete"/>

            {this.state.comments.map( function(comment) {
               return <Comment id = {comment.id} removeComment={this.deleteComment}/>;
            })}

            <form action={this.add}>
                <p><b>Введите ваш комментарий:</b></p>
                <p><textarea rows="10" cols="45" name="text"></textarea></p>
                <p><input type="submit" value="Оставить"/></p>
            </form>
        </div>
        );
    }
}