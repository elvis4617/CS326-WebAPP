import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
import MailToolBar from './mailtoolbar';
//import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title';
import {getRequestData, writeRequest, joinGroup, getUserById} from '../../server';
import MailEntry from './mailentry';

export default class MailBoxThread extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      contents: [],
      mailBoxType: "all",
      userName:""
    };
  }

  initialize(){
    getUserById(this.props.user, (userData) => {
      this.setState({userName:userData.fullName});
    });
  }

  refresh(){
    getRequestData(this.props.user, (temp)=>{
      this.setState({contents:temp});
    });
  }

  onSend(requestContent, recieverEntry, titleEntry, groupEntry, typeEntry){

    writeRequest(this.props.user, recieverEntry, requestContent, titleEntry, groupEntry, typeEntry, () =>{
      this.refresh();
    });

  }

  onAccept(userName, groupName, requestId){
    joinGroup(userName,groupName, requestId,() =>{
      this.refresh();
    });
  }
  componentDidMount(){
    this.initialize();
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
      return ( reciever === this.state.userName);
    }
    else
      return (author === this.state.userName);
  }

  render(){

    return(

      <div className="container content">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />
            <MailToolBar onApply={(e) => this.handleChangeMailBox(e)}
                         mailBoxType = {this.state.mailBoxType}
                         userName = {this.state.userName}/>

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
                                 onAccept={(userName, groupName, requestId) => this.onAccept(userName, groupName, requestId)}
                                 userName = {this.state.userName}>
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
