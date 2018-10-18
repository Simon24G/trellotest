import React, { Component } from "react";
import PropTypes from "prop-types";
import CardIconContainer from "../container/cardIcon-container.js";

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

  changeNameCol = elem => {
    let col = JSON.parse(localStorage.getItem("col_" + this.state.id));
    col.name = elem.value;
    localStorage.setItem("col_" + this.state.id, JSON.stringify(col));
    this.setState({ name: col.name });
  };
  editName = () => {
    this.setState(ps => {
      return {
        isEditName: true,
        nameCol: ps.name
      };
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
    const { id, name, cards } = this.props.col;
    const { nameCol, isEditName } = this.state;
    //<CardContainer card={{ id: 0, colId: id }} close={this.close} />//?????

    return (
      <div className="col">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">
            Name Col:{" "}
            {isEditName ? (
              <form onSubmit={this.saveName}>
                <input
                  type="text"
                  onChange={e => {
                    this.setState({
                      nameCol: e.target.value
                    });
                  }}
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
              {cards.map(card => {
                return <CardIconContainer key={card.id} id={card.id} />;
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
  col: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

export default Col;
