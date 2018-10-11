import React from "react";
import Card from "./Card.js";

class CardIcon extends React.Component {
  constructor(props) {
    super(props);
    const card = JSON.parse(localStorage.getItem("card_" + props.id));
    this.state = {
      id: props.id,
      isOpenCard: props.isOpen,
      name: card.name,
      colName: props.colName,
      description: card.description,
      countComments: card.comments.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colName !== this.state.colName)
      this.setState({ colName: nextProps.colName });
    if (this.state.id && nextProps.id === this.state.id) return;
    this.setState({ id: nextProps.id });
    this.update();
  }
  update = () => {
    const card = JSON.parse(localStorage.getItem("card_" + this.state.id));
    this.setState({
      name: card.name,
      description: card.description,
      countComments: card.comments.length
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
  delete = () => {
    return this.props.delete(this.props.id);
  };

  render() {
    const { isOpenCard, countComments, id, colName } = this.state;
    return (
      <div className="CardIcon">
        <div className="card text-white bg-success mb-3">
          <div className="card-header">Name card: {this.state.name}</div>
          <div className="card-body">
            <h5 className="card-title">Description:</h5>
            <pre className="card-text">{this.state.description}</pre>
            <p>
              Comments: {countComments} {"  "}
              <button
                type="button"
                className="btn btn-info"
                onClick={this.open}
              >
                Open
              </button>
            </p>
          </div>
        </div>

        {isOpenCard && (
          <Card
            id={id}
            colName={colName}
            close={this.close}
            delete={this.delete}
            update={this.update}
          />
        )}
      </div>
    );
  }
}

export default CardIcon;
