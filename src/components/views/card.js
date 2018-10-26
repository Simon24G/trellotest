import React, { Component } from "react";
import PropTypes from "prop-types";
//import Navigate from "../views/navigate.js";

class Card extends Component {
  static propTypes = {
    card: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      comments: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          authorName: PropTypes.string.isRequired,
          cardId: PropTypes.number.isRequired
        }).isRequired
      ),
      colId: PropTypes.number.isRequired
    }).isRequired,

    saveCard: PropTypes.func.isRequired,
    closeCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.card.name,
      description: props.card.description
    };
  }

  componentWillReceiveProps(nextProps) {
    //отделить current от reality
    this.setState({
      name: nextProps.card.name,
      description: nextProps.card.description
    });
  }

  saveCard = event => {
    event.preventDefault();
    this.props.saveCard(this.state.name, this.state.description);
  };

  render() {
    const { closeCard, children } = this.props;
    const { name, description } = this.state;

    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {React.Children.map(
                  children,
                  child => child && child.key === "Navigate" && child
                )}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeCard}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body square scrollbar-cyan bordered-cyan">
              <form onSubmit={this.saveCard}>
                <div className="form-row">
                  <div className="col-md-2 mb-1">
                    <label htmlFor="nameCurrentCard">Name</label>
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                      className="form-control"
                      id="nameCurrentCard"
                      value={name}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="descriptionCurrentCard">Description</label>
                    <textarea
                      onChange={e => {
                        this.setState({ description: e.target.value });
                      }}
                      className="form-control square scrollbar-cyan bordered-cyan"
                      id="descriptionCurrentCard"
                      rows="6"
                      cols="55"
                      value={description}
                      required
                    />
                  </div>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                  {React.Children.map(
                    children,
                    child => child && child.key === "ButtonDelete" && child
                  )}
                </div>
              </form>
              {React.Children.map(
                children,
                child => child && child.key === "CommentContainer" && child
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
