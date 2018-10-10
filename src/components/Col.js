import React from "react";
import CardIcon from "./CardIcon.js";
import Card from "./Card.js";

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
      name: col.name,
      isOpen: false
    };
  }

  delete = id => {
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    for (let index = 0; index < col.cards.length; index++) {
      if (col.cards[index].id === id) {
        col.cards.splice(index, 1);
        localStorage.setItem("col_" + this.id, JSON.stringify(col));
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
    this.setState({
      isOpen: true,
      isOpenCreateCard: true
    });
  };
  eventCreateCard = id => {
    let card = JSON.parse(localStorage.getItem("card_" + id));
    card.id = id;
    localStorage.setItem("card_" + id, JSON.stringify(card));
    let col = JSON.parse(localStorage.getItem("col_" + this.id));
    col.cards.push({ id: id });
    localStorage.setItem("col_" + this.id, JSON.stringify(col));

    this.setState({
      cards: col.cards,
      isOpen: true,
      isOpenCreateCard: false,
      cardId: id
    });
  };
  close = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { name, cards, isOpen, isOpenCreateCard } = this.state;

    return (
      <div className="Col">
        {isOpen && isOpenCreateCard ? (
          <Card
            id="0"
            colName={name}
            close={this.close}
            eventCreateCard={this.eventCreateCard}
          />
        ) : (
          ""
        )}
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Name Col: {name}</div>
          <div className="card-body">
            <div>
              {cards.map((card, index) => {
                return (
                  <CardIcon
                    colName={name}
                    isOpen={
                      index + 1 === cards.length && isOpen && !isOpenCreateCard
                    }
                    id={card.id}
                    delete={this.delete}
                  />
                );
              })}
            </div>
            <p>
              Вставьте новую карточку{" "}
              <input type="button" onClick={this.add} value="+" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Col;
