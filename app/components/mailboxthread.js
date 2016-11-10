import React from 'react';
import MailBox from './mailbox';
import Mail from './mail';

export default class MailBoxThread extends React.Component{
  render(){
    return(
      <div className = "message-panel">
        <MailBox >
          <Mail title="This is real"
                author="Alpha Male"
                postDate="20 hr"/>
        </MailBox>
      </div>
    )
  }
}
