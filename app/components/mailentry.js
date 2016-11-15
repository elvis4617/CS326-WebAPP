import React from 'react';

export default class MailEntry extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      reciever:"",
      content:"",
      title:""
    };
  }

   handlePost(e){
     //Prevent the event from 'bubbling' up the DOM tree.
     e.preventDefault();
     //Trim whitespace from beginning + end of entry.
     var statusUpdateText = this.state.content.trim();
     var recieverEntry = this.state.reciever.trim();
     var titleEntry = this.state.title.trim();
     if (statusUpdateText !== "" && recieverEntry !=="" && titleEntry != ""){
       this.props.onSend(statusUpdateText, recieverEntry, titleEntry);
       // Reset status update.
       this.setState({reciever:"",
                      content:"",
                      title:""});
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

 handleChangeTitle(e){
   e.preventDefault();
   this.setState({title: e.target.value});
}

  render() {
    return (

      <div className="modal fade" id="entry-modal-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Send <small>say something I am giving up on you</small></h4>
            </div>
            <div className="modal-body">

              <div className="form-group">
                <label htmlFor="recieverEntry-1">To:</label>
                <input      type="text"
                            className="form-control"
                            placeholder="Write a comment.."
                            value={this.state.reciever}
                            onChange={(e) => this.handleChangeName(e)}/>
              </div>

              <div className="form-group">
                <label htmlFor="titleEntry-1">Ttile:</label>
                <input      type="text"
                            className="form-control"
                            placeholder="Write a title.."
                            value={this.state.title}
                            onChange={(e) => this.handleChangeTitle(e)}/>
              </div>

              <div className="form-group">
                <textarea className="form-control"
                          rows="2"
                          placeholder="What's on your mind?"
                          value ={this.state.content}
                          onChange = {(e) => this.handleChangeContent(e)}/>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.handlePost(e)}>Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
