import React from "react";

//ready to check and check phase render
class PopupAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.saveName = event => {
      event.preventDefault();
      const name = this.refs["name"].value;
      if (name === "") return;
      // alert(this.refs["name"].value);
      // alert(JSON.stringify(elem));
      props.saveName(name);
    };
    //
    this.state = { mv: "12d" };
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={this.saveName}>
          <div>Как вас звать?</div>
          <input ref="name" type="text" />
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
