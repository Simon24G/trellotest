import React, { Component } from "react";
import PropTypes from "prop-types";
import CardIcon from "/../veiws/cardIcon.js";
import { openCard } from "/../api/user-api.js";
import { changeNameCol } from "/../api/col-api.js";

class Col extends Component {
  static propTypes = {
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

  constructor(props) {
    super(props);
    this.state = { isEditName: false };
  }

  editName = () => {
    this.setState({
      isEditName: true,
      nameCol: this.props.col.name
    });
  };
  saveName = () => {
    changeNameCol(this.props.col.id, this.state.nameCol);
    this.setState({
      isEditName: false
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

    const formColName = isEditName ? (
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
        <button className="btn btn-success" onClick={this.closeEditName}>
          Close
        </button>
      </form>
    ) : (
      <div>
        {name}{" "}
        <button className="btn btn-success" onClick={this.editName}>
          Edit
        </button>
      </div>
    );

    return (
      <div className="col">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Name Col: {formColName} </div>
          <div className="card-body">
            <div>
              {cards.map(card => {
                return <CardIcon key={card.id} id={card.id} />;
              })}
            </div>
            <div>
              Вставьте новую карточку{" "}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  openCard(0, id);
                }}
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

export default Col;
