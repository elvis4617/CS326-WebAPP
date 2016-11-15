import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
import MailToolBar from './mailtoolbar';
import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title';
import {getRequestData, writeRequest} from '../server';
import MailEntry from './mailentry';

export default class MailBoxThread extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      contents: []
    };
  }


  refresh(){
    getRequestData(1, (temp)=>{
      this.setState({contents:temp});
    });
  }

  onSend(requestContent){

    writeRequest(1, 3, requestContent, () =>{
      this.refresh();
    });

  }

  componentDidMount(){
    this.refresh();
  }


  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />

            <MailToolBar />
            <MailEntry  onSend={(requestContent) => this.onSend(requestContent)}/>
            <div className="row">
              <MailBox >
               {this.state.contents.map((requestItem, i) => {
                return(
                   <Mail key={i} author={requestItem.author}
                                 reciever={requestItem.reciever}
                                 createDate={requestItem.createDate}
                                 title={requestItem.title}
                                 mailId={requestItem._id}>
                                 {requestItem.content}
                  </Mail>
                 );
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
