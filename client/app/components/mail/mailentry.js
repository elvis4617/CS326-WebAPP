import React from 'react';

export default class MailEntry extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      reciever:"",
      content:"",
      title:"",
      grooup:"",
      mailType:""
    };
  }

   handlePost(e){
     //Prevent the event from 'bubbling' up the DOM tree.
     e.preventDefault();
     //Trim whitespace from beginning + end of entry.
     var statusUpdateText = this.state.content.trim();
     var recieverEntry = this.state.reciever.trim();
     var titleEntry = this.state.title.trim();
     var groupEntry = this.state.group.trim();
     var typeEntry = this.state.mailType.trim();

     if (statusUpdateText !== "" && recieverEntry !=="" && groupEntry != "" && typeEntry != ""){
       this.props.onSend(statusUpdateText, recieverEntry, titleEntry, groupEntry,typeEntry);

       // Reset status update.
       this.setState({reciever:"",
                      content:"",
                      title:"",
                      group:"",
                      mailType:""}
                    );
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

  handleChangeGroup(e){
  e.preventDefault();
  this.setState({group: e.target.value});
  }

  handleChangeRadio(e){
  e.preventDefault();
  this.setState({mailType:e.target.value});
  e.target.checked=true;

  }

  didUserCheckRequest(){
    if( this.state.mailType === "request")
      return true;

    return false;
  }

  didUserCheckInvite(){
    if( this.state.mailType === "invite")
      return true;

    return false;
  }

  render() {

  //  var requestChecked = this.didUserCheckRequest();
    //requestChecked += "aaaaaa";
  //  var inviteChecked = this.didUserCheckInvite();

    return (

      <div className="modal fade" id="entry-modal-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Send <small>say something I am giving up on you</small></h4>
            </div>
            <div className="modal-body">

              <div className="form-group" >
                <legend>Invitation or Request</legend>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="radio"
                             className="form-check-input"
                             value="invite"

                             onClick={(e) => this.handleChangeRadio(e)}
                             checked= {this.state.mailType === "invite"}
                             />
                           <small>  Invite </small>
                    </label>
                  </div>
                  <div className="form-check" >
                    <label className="form-check-label">
                      <input type="radio"
                             className="form-check-input"
                             value="request"

                            onClick={(e) => this.handleChangeRadio(e)}
                             checked={this.state.mailType === "request"}
                             />
                           <small>Request </small>
                    </label>
                  </div>
              </div>

              <p> {this.state.mailType}</p>

              <div className="form-group">
                <label htmlFor="recieverEntry-1">To:</label>
                <input      type="text"
                            id = "recieverEntry-1"
                            className="form-control"
                            placeholder="Write a comment.."
                            value={this.state.reciever}
                            onChange={(e) => this.handleChangeName(e)}/>
              </div>

              <div className="form-group">
                <label htmlFor="titleEntry-1">Ttile:</label>
                <input      type="text"
                            id="titleEntry-1"
                            className="form-control"
                            placeholder="Write a title.."
                            value={this.state.title}
                            onChange={(e) => this.handleChangeTitle(e)}/>
              </div>



              <div className="form-group">
                <label htmlFor="groupEntry-1">Group:</label>
                <input      type="text"
                            id="groupEntry-1"
                            className="form-control"
                            placeholder="Write a group name.."
                            value={this.state.group}
                            onChange={(e) => this.handleChangeGroup(e)}/>
              </div>

              <div className="form-group">
                <label htmlFor="messageEntry-1">Message:</label>
                <textarea className="form-control"
                          id="messageEntry-1"
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
