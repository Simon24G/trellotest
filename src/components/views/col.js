import React, { Component } from "react";
import PropTypes from "prop-types";
import CardIcon from "./cardIcon.js";
import { openCard } from "../../api/user-api.js";
import { changeNameCol } from "../../api/col-api.js";
import { connect } from "react-redux";

class Col extends Component {
  static propTypes = {
    col: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cards: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          colId: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired,

    openCard: PropTypes.func.isRequired,
    changeNameCol: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isEditName: false };
  }
  componentWillReceiveProps(nextProps) {
    console.log("Col WillReceiveProps " + this.props.col.name);
    console.log("new props: ", nextProps);
    console.log("old props: ", this.props);
    console.log("_________________________________________");
  }

  editName = () => {
    this.setState({
      isEditName: true,
      nameCol: this.props.col.name
    });
  };
  saveName = e => {
    e.preventDefault();
    this.props.changeNameCol(this.props.col.id, this.state.nameCol);
    this.setState({
      isEditName: false
    });
  };
  closeEditName = () => {
    this.setState({
      isEditName: false
    });
  };
  changeName = e => {
    this.setState({
      nameCol: e.target.value
    });
  };
  render() {
    const { id, name, cards } = this.props.col;
    const { nameCol, isEditName } = this.state;
    /*
    console.log("Col render " + name);
    console.log("cards: ", cards);
    console.log("_________________________________________");
    */
    const formColName = isEditName ? (
      <form onSubmit={this.saveName}>
        <input
          type="text"
          onChange={this.changeName}
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

    let cardsIconsComponets = [];
    for (var key in cards) {
      if (cards.hasOwnProperty(key)) {
        cardsIconsComponets.push(
          <CardIcon key={cards[key].id} id={cards[key].id} />
        );
      }
    }
    console.log("Col cardsIcons", cardsIconsComponets.length);

    return (
      <div className="col">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Name Col: {formColName} </div>
          <div className="card-body">
            <div>{cardsIconsComponets}</div>
            <div>
              Вставьте новую карточку{" "}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.openCard(0, id);
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

const mapDispatchToProps = dispatch => {
  return {
    changeNameCol: (id, name) => dispatch(changeNameCol(id, name)),
    openCard: (id, colId) => dispatch(openCard(id, colId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Col);
