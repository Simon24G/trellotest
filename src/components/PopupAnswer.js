import React from "react";

//ready to check and check phase render
class PopupAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = elem => props.saveName(elem.name.value);
  }
  render() {
    return (
      <div>
        <form action={this.saveName}>
          <div>Как вас звать?</div>
          <input name="name" type="text" />
          <input type="submit">Вот он я!</input>
        </form>
      </div>
    );
  }
}

export default PopupAnswer;
