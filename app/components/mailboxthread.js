import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
import MailToolBar from './mailtoolbar';
import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title';
import {getRequestData, getRecommendPostItem, getUser} from '../server';

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


  componentDidMount(){
    this.refresh();
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />
            <p>{this.state.contents.length}</p>
            <MailToolBar />

            <div className="row">
              <MailBox >
               {this.state.contents.map((requestItem, i) => {
                return(
                   <Mail key={i} author={requestItem.author}
                                 reciever={requestItem.reciever}
                                 createDate={requestItem.createDate}
                                 title={requestItem.title}>
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
