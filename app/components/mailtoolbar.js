import React from 'react';

export default class MailToolBar extends React.Component{
  render(){
    var inboxActive ="";
    var outboxActive ="";
    var allActive="";

    if(this.props.mailBoxType === "inbox"){
      inboxActive = "active";
      outboxActive ="";
      allActive="";
    }
    else if(this.props.mailBoxType === "outbox"){
      inboxActive = "";
      outboxActive ="active";
      allActive="";
    }
    else{
      inboxActive = "";
      outboxActive ="";
      allActive="active";
    }
    return(


      <div className="row">
          <div className="btn-group pull-left n-toolbar" role="group" aria-label="...">
            <button type="button"
                    className={"btn "+inboxActive}
                    value ="inbox"
                    onClick={(e) => this.props.onApply(e)}>
                    Inbox
            </button>
            <button type="button"
                    className={"btn "+outboxActive}
                    value = "outbox"
                    onClick={(e) => this.props.onApply(e)}>
                    Outbox
            </button>
            <button type="button"
                    className={"btn "+allActive}
                    value="all"
                    onClick={(e) => this.props.onApply(e)}>
                    All Notification
            </button>
            <button type="button" className="btn " data-toggle="modal" data-target="#entry-modal-1">Write</button>

          </div>
      </div>


    )
  }
}
