import React, { Component } from "react";
import PropTypes from "prop-types";
import CardIcon from "./CardIcon.js";
import Card from "./Card.js";

class Col extends Component {
  constructor(props) {
    super(props);
    let state = Col.getNewPeaceState(props);
    state.isEditName = false;
    state.isOpen = false;
    this.state = state;
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.id && nextProps.id === this.state.id) return;
    this.setState(Col.getNewPeaceState(nextProps));
  }
  static getNewPeaceState(nextProps) {
    let col = JSON.parse(localStorage.getItem("col_" + nextProps.id));
    return {
      author: JSON.parse(localStorage.getItem("author")),
      id: nextProps.id,
      cards: col.cards,
      name: col.name
    };
  }

  delete = id => {
    let col = JSON.parse(localStorage.getItem("col_" + this.state.id));
    for (let index = 0; index < col.cards.length; index++) {
      if (col.cards[index].id === id) {
        col.cards.splice(index, 1);
        localStorage.setItem("col_" + this.state.id, JSON.stringify(col));
        break;
      }
    }
    this.setState({
      cards: col.cards
    });
  };
  changeNameCol = elem => {
    let col = JSON.parse(localStorage.getItem("col_" + this.state.id));
    col.name = elem.value;
    localStorage.setItem("col_" + this.state.id, JSON.stringify(col));
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
    let col = JSON.parse(localStorage.getItem("col_" + this.state.id));
    col.cards.push({ id: id });
    localStorage.setItem("col_" + this.state.id, JSON.stringify(col));

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
  editName = () => {
    this.setState(ps => {
      return {
        isEditName: true,
        nameCol: ps.name
      };
    });
  };
  nameChange = e => {
    this.setState({
      nameCol: e.target.value
    });
  };
  saveName = () => {
    let col = JSON.parse(localStorage.getItem("col_" + this.state.id));
    col.name = this.state.nameCol;
    localStorage.setItem("col_" + this.state.id, JSON.stringify(col));

    this.setState(ps => {
      return {
        name: ps.nameCol,
        isEditName: false
      };
    });
  };
  closeEditName = () => {
    this.setState({
      isEditName: false
    });
  };
  render() {
    const {
      name,
      nameCol,
      cards,
      isOpen,
      isOpenCreateCard,
      isEditName
    } = this.state;

    return (
      <div className="col">
        {isOpen &&
          isOpenCreateCard && (
            <Card
              id="0"
              colName={name}
              close={this.close}
              eventCreateCard={this.eventCreateCard}
            />
          )}
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">
            Name Col:{" "}
            {isEditName ? (
              <form onSubmit={this.saveName}>
                <input
                  type="text"
                  onChange={this.nameChange}
                  className="form-control"
                  value={nameCol}
                  required
                />
                <button className="btn btn-success" type="submit">
                  Save
                </button>{" "}
                <button
                  className="btn btn-success"
                  onClick={this.closeEditName}
                >
                  Close
                </button>
              </form>
            ) : (
              <div>
                {" "}
                {name}{" "}
                <button className="btn btn-success" onClick={this.editName}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="card-body">
            <div>
              {cards.map((card, index) => {
                return (
                  <CardIcon
                    key={card.id}
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
            <div>
              Вставьте новую карточку{" "}
              <button
                type="button"
                className="btn btn-success"
                onClick={this.add}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Col.propTypes = {
  id: PropTypes.number.isRequired
};

export default Col;
