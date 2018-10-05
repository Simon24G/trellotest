import React from '/../../lib/node_modules/react';
import Card from 'Card';

//ready to check and check phase render
//realise open()
//Realise array in HashMap with key id
export default class CardIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpenCard : false};
    this.delete = () => props.delete(nextProps.id);//check!!!
    
    this.changeCountComment = (number) => this.changeCountComment(number);
    this.changeNameCard = (elem) => this.changeNameCard(elem);
    this.changeDescriptionCard = (elem) => this.changeDescriptionCard(elem);
    this.open = () => this.open;
    this.close = () => this.close;
  }
  componentWillReceiveProps(nextProps){
    this.setState({colName: nextProps.colName});
    if(this.id && (nextProps.id === this.id)) return;
    this.id = nextProps.id;
    this.update();
  }
  update(){
    const card = JSON.parse(localStorage.getItem("card_" + this.id));
    this.setState({
      name: card.name,
      description: card.description,
      countComments: card.comments.length
    });
  }
  open(){
    this.setState({
      isOpenCard: true
    });
  }
  close(){
    this.setState({
      isOpenCard: false
    });
  }
  changeCountComment(number){
    this.setState((prevState) => {
      return {countComments: prevState.countComments + number};
    });   
  }
  render() {
    const card = this.state.isOpenCard ? <Card id={this.id} colName={this.state.colName} close={this.close} delete={this.delete} update={this.update}/> : null;
  
    return (
      <div>
        {card}
        <p>
          <h>{this.state.name}</h>
          <input type="button" onClick={this.open} value="Open"/>
        </p>
        <p>
          <p>{this.state.description}</p>
          <h>Comments: {this.state.countComments}</h>
        </p>
      </div>
    );
  }
}