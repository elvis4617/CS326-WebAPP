import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';
import MailToolBar from './mailtoolbar';
import PageNav from './pagenav';
import MailBoxTitle from './mailbox_title'

export default class MailBoxThread extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <MailBoxTitle />
            <MailToolBar />

            <div className="row">
              <MailBox >
                <Mail title="This is real"
                      author="Alpha Male"
                      postDate="20 hr"/>
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
