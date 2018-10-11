import React from "react";

class PopupAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = event => {
      event.preventDefault();
      if (this.state.name === "") return;
      props.saveName(this.state.name);
    };
    this.state = { name: "", isOpen: false, mv: "12d" };
  }
  popup = () => {
    this.setState({ isOpen: true });
  };
  nameChange = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.saveName}>
          <div>Как вас звать?</div>
          <input onChange={this.nameChange} type="text" />
          <input value="Вот он я!" type="submit" />
        </form>
      </div>
    );
  }
}

export default PopupAnswer;
