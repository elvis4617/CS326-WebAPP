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

  handleChangeOutBox(e){
    e.preventDefault();
    this.setState({mailBoxType:"outbox"});
  }

  handleChangeInBox(e){
    e.preventDefault();
    this.setState({mailBoxType:"inbox"});
  }

  handleChangeAllBox(e){
    e.preventDefault();
    this.setState({mailBoxType:"all"});
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
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />

            <div className="row">
                <div className="btn-group pull-left n-toolbar" role="group" aria-label="...">
                  <button type="button"
                          className="btn "
                          onClick={(e) => this.handleChangeInBox(e)}>
                          Inbox
                  </button>
                  <button type="button"
                          className="btn "
                          onClick={(e) => this.handleChangeOutBox(e)}>
                          Outbox
                  </button>
                  <button type="button"
                          className="btn "
                          onClick={(e) => this.handleChangeAllBox(e)}>
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
                                 type={requestItem.type}>
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
