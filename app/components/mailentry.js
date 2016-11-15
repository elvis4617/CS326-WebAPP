import React from 'react';

export default class MailEntry extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      reciever:"",
      content:""
    };
  }

   handlePost(e){
     //Prevent the event from 'bubbling' up the DOM tree.
     e.preventDefault();
     //Trim whitespace from beginning + end of entry.
     var statusUpdateText = this.state.content.trim();
     var recieverEntry = this.state.reciever.trim();
     if (statusUpdateText !== "" && recieverEntry !==""){
       this.props.onSend(statusUpdateText);
       // Reset status update.
       this.setState({reciever:"",content:""});
     }
   }

   /**
    * Called when the user types a character into the status update box.
    * @param e An Event object.
    */
   handleChangeContent(e){
     e.preventDefault();
     this.setState({content: e.target.value});
  }

  handleChangeName(e){
    e.preventDefault();
    this.setState({reciever: e.target.value});
 }

  render() {
    return (
      <div className=" panel panel-default">
        <div className="panel-body">
          <div className="media">

            <div className="media-body">

              <div className="form-group">
                <label htmlFor="recieverEntry-1">To:</label>
                <input      type="text"
                            className="form-control"
                            placeholder="Write a comment.."
                            value={this.state.reciever}
                            onChange={(e) => this.handleChangeName(e)}/>
              </div>

              <div className="form-group">
                <textarea className="form-control"
                          rows="2"
                          placeholder="What's on your mind?"
                          value ={this.state.content}
                          onChange = {(e) => this.handleChangeContent(e)}/>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
              <div className="pull-right">

                <button type="button"
                        className="btn btn-default"
                        onClick={(e) => this.handlePost(e)}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
