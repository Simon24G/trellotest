import React from "react";
import CardIcon from "./CardIcon.js";

//ready to check and check phase render
class Col extends React.Component {
  constructor(props) {
    super(props);
    this.author = JSON.parse(localStorage.getItem("author"));
    this.state = this.getNewPeaceState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.id && nextProps.id === this.id) return;
    this.setState(this.getNewPeaceState(nextProps));
  }
  getNewPeaceState(nextProps) {
    this.id = nextProps.id;
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    //JSON.parse(localStorage.getItem("col_" + this.id));
    this.cards = col.cards;
    return {
      cards: this.cards,
      name: col.name
    };
  }

  delete = id => {
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    //alert(id);
    for (let index = 0; index < col.cards.length; index++) {
      if (col.cards[index].id === id) {
        col.cards.splice(index, 1);
        localStorage.setItem("col_" + this.id, JSON.stringify(col));
        alert("after delete: " + localStorage.getItem("col_" + this.id));
        break;
      }
    }
    this.setState({
      cards: col.cards
    });
  };
  changeNameCol = elem => {
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    col.name = elem.value;
    localStorage.setItem("col_" + this.id, JSON.stringify(col));
    this.setState({ name: col.name });
  };
  add = () => {
    const nextId = 1 + +localStorage.getItem("last_id");
    const card = {
      id: nextId,
      text: "",
      colId: this.id,
      authorId: this.author.id,
      comments: []
    };
    localStorage.setItem("card_" + nextId, JSON.stringify(card));
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    col.cards.push({ id: nextId });
    localStorage.setItem("col_" + this.id, JSON.stringify(col));
    localStorage.setItem("last_id", nextId);

    this.setState({
      cards: col.cards
    });
    //Stores.commentStore.add(comment) with generated id???
  };
  render() {
    const { name, cards } = this.state;
    return (
      <div>
        <form action={this.changeNameCol}>
          <p>
            <h>{name}</h>
          </p>
        </form>
        <div>
          {cards.map(card => {
            return (
              <CardIcon colName={name} id={card.id} delete={this.delete} />
            );
          })}
        </div>
        <p>
          Вставьте новую карточку{" "}
          <input type="button" onClick={this.add} value="+" />
        </p>
      </div>
    );
  } //may be better to push { () => updateName() }
}

export default Col;
