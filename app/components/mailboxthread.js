import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
import MailToolBar from './mailtoolbar';
//import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title';
import {getRequestData, writeRequest, joinGroup} from '../server';
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

  onAccept(userName, groupName, requestId){
    joinGroup(userName,groupName, requestId,() =>{
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

    return(

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />


            <MailToolBar onApply={(e) => this.handleChangeMailBox(e)}
                         mailBoxType = {this.state.mailBoxType}/>

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
                                 status={requestItem.status}
                                 onAccept={(userName, groupName, requestId) => this.onAccept(userName, groupName, requestId)}>
                                 {requestItem.content}
                  </Mail>
                 );
               }
               })
             }
              </MailBox>
            </div>


          </div>
        </div>
      </div>
    )
  }
}
