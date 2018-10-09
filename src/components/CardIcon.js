import React from "react";
import Card from "./Card.js";

//ready to check and check phase render
//realise open()
//Realise array in HashMap with key id
class CardIcon extends React.Component {
  constructor(props) {
    super(props);
    this.delete = () => props.delete(props.id);
    this.id = props.id;
    const card = JSON.parse(localStorage.getItem("card_" + this.id));
    this.state = {
      isOpenCard: false,
      name: card.name,
      description: card.description,
      countComments: card.comments.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colName !== this.state.colName)
      this.setState({ colName: nextProps.colName });
    if (this.id && nextProps.id === this.id) return;
    this.id = nextProps.id;
    this.update();
  }
  update = () => {
    const card = JSON.parse(localStorage.getItem("card_" + this.id));
    //alert(card.comments.length);
    this.setState(prevState => {
      return {
        name: card.name,
        description: card.description,
        countComments: card.comments.length
      };
    });
  };
  open = () => {
    this.setState({
      isOpenCard: true
    });
  };
  close = () => {
    this.setState({
      isOpenCard: false
    });
  };
  render() {
    const { isOpenCard, countComments } = this.state;
    return (
      <div className="CardIcon">
        {isOpenCard && (
          <Card
            id={this.id}
            colName={this.state.colName}
            close={this.close}
            delete={this.delete}
            update={this.update}
          />
        )}
        <p>
          <h>Name card: {this.state.name}</h>
        </p>
        <p>Description:</p>
        <textarea rows="5" cols="25" readonly value={this.state.description} />
        <p>
          Comments: {countComments} {"  "}
          <input type="button" onClick={this.open} value="Open" />
        </p>
      </div>
    );
  }
  //button
}

export default CardIcon;

/*
<p white-space="pre">{this.state.description}</p>

<textarea rows="5" cols="30" ref="description" white-space="pre-wrap">
            {this.state.description}
          </textarea>

*/
