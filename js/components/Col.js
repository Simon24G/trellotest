import React from '/../../lib/node_modules/react';
import CardIcon from 'CardIcon';

//ready to check and check phase render
export default class Col extends React.Component {
    constructor(props) {
        super(props);
        this.delete = (id) => {this.delete(id)};
        this.add = () => this.add();
        this.changeNameCol = (elem) => this.changeNameCol(elem);
        this.author = JSON.parse(localStorage.getItem("author"));
    }
    componentWillReceiveProps(nextProps) {
        if(this.id && (nextProps.id === this.id)) return;
        this.id = nextProps.id;
        let col = JSON.parse(localStorage.getItem("col_" + this.id));
  
        this.cards = col.cards;
        this.setState({
            cards: this.cards,
            name: col.name
        });
    }  
    delete(id){
        let col = JSON.parse(localStorage.getItem("col_" + id));
        for(let index = 0; index < col.cards.length; index++){
            if(col.cards[index].id == elem.id){
                col.cards.splice(index, 1);
                localStorage.setItem("col_" + id, JSON.stringify(col));
            }
        }
        this.setState({
            cards: col.cards
        });
    }
    changeNameCol(elem){
        let col = JSON.parse(localStorage.getItem("col_" + this.id));
        col.name = elem.value;
        localStorage.setItem("col_" + this.id, JSON.stringify(col));
        this.setState({name: col.name});
    }
    add(){
        const nextId = localStorage.getItem("last_id") + 1;
        const card = {
            id: nextId,
            text: "", 
            colId: this.id,
            authorId: this.author.id,
            comments: [] 
        };
        localStorage.setItem("card_" + nextId, JSON.stringify(card));
        
        let col = JSON.parse(localStorage.getItem("col_" + this.id));
        col.cards.push({id: nextId});
        localStorage.setItem("col_" + this.id, JSON.stringify(col));  
        localStorage.setItem("last_id", next_id);

        this.setState({
            cards: col.cards
        });
        //Stores.commentStore.add(comment) with generated id???
    }
    render() {
        return (
            <div>
                <form action={this.changeNameCol}>
                    <p>
                        <h>{this.state.name}</h>
                    </p>
                </form>
                <div>
                    {this.state.cards.map( function(card) {
                        return <CardIcon colName={this.state.name} id={card.id} delete={this.delete}/>;
                    })}
                </div>
                <p>Вставьте новую карточку <input type="button" onClick={this.add} value="+"/></p>
            </div>
        );
    }//may be better to push { () => updateName() }
}