import React from "react";

//ready to check and check phase render
class PopupAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = event => {
      event.preventDefault();
      // alert(this.refs["name"].value);
      // alert(JSON.stringify(elem));
      props.saveName(this.refs["name"].value);
    };
    //
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveName}>
          <div>Как вас звать?</div>
          <input name="name" ref="name" type="text" />
          <input value="Вот он я!" type="submit" />
        </form>
      </div>
    );
  }
}

export default PopupAnswer;
/*
     <button type="submit">Вот он я!</button>
     
<form action={this.saveName}>
        

        
*/
