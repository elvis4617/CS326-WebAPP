import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
//import MailToolBar from './mailtoolbar';
import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title';
import {getRequestData, writeRequest} from '../server';
import MailEntry from './mailentry';

export default class MailBoxThread extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      contents: [],
      mailBoxType: "all"
    };
  }


  refresh(){
    getRequestData(1, (temp)=>{
      this.setState({contents:temp});
    });
  }

  onSend(requestContent, recieverEntry, titleEntry, groupEntry, typeEntry){

    writeRequest(1, recieverEntry, requestContent, titleEntry, groupEntry, typeEntry, () =>{
      this.refresh();
    });

  }

  componentDidMount(){
    this.refresh();
  }

  //Filter
  handleChangeMailBox(e){
    e.preventDefault();
    this.setState({mailBoxType:e.target.value});
  }

  filterMail(author, reciever){
    if(this.state.mailBoxType === "all")
      return true;
    if("inbox" === this.state.mailBoxType){
      //console.log("aaaaa");
      return ( reciever === "Someone");
    }
    else
      return (author === "Someone");
  }

  render(){
    var inboxActive ="";
    var outboxActive ="";
    var allActive="";

    if(this.state.mailBoxType === "inbox"){
      inboxActive = "active";
      outboxActive ="";
      allActive="";
    }
    else if(this.state.mailBoxType === "outbox"){
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

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />

            <div className="row">
                <div className="btn-group pull-left n-toolbar" role="group" aria-label="...">
                  <button type="button"
                          className={"btn "+inboxActive}
                          value ="inbox"
                          onClick={(e) => this.handleChangeMailBox(e)}>
                          Inbox
                  </button>
                  <button type="button"
                          className={"btn "+outboxActive}
                          value = "outbox"
                          onClick={(e) => this.handleChangeMailBox(e)}>
                          Outbox
                  </button>
                  <button type="button"
                          className={"btn "+allActive}
                          value="all"
                          onClick={(e) => this.handleChangeMailBox(e)}>
                          All Notification
                  </button>
                  <button type="button" className="btn " data-toggle="modal" data-target="#entry-modal-1">Write</button>

                </div>
            </div>
            <p>{this.state.mailBoxType}</p>
            <MailEntry  onSend={(requestContent, recieverEntry, titleEntry, groupEntry, typeEntry) => this.onSend(requestContent, recieverEntry, titleEntry, groupEntry, typeEntry)}/>
            <div className="row">
              <MailBox >
               {this.state.contents.map((requestItem, i) => {
                if(this.filterMail(requestItem.author, requestItem.reciever)){
                return(
                   <Mail key={i} author={requestItem.author}
                                 reciever={requestItem.reciever}
                                 createDate={requestItem.createDate}
                                 title={requestItem.title}
                                 mailId={requestItem._id}
                                 group={requestItem.group}
                                 type={requestItem.type}
                                 status={requestItem.status}>
                                 {requestItem.content}
                  </Mail>
                 );
               }
               })
             }
              </MailBox>
            </div>

            <div className="row">
              <PageNav />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
