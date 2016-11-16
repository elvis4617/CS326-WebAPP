import React from 'react';
import {unixTimeToString} from '../util'
import AccountDetailModal from './accountDetailModal';
import ThreadModal from './threadmodal';

export default class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.data;
  }

  render(){
    return(
      <tr>
        <th colSpan = "2" className = "thread text-left"><a data-toggle = "modal" data-target={"#thread-modal"+this.state._id} href="#">{this.state.title}</a>
          <ThreadModal id = {this.state._id}>
          </ThreadModal>
        </th>
        <th className = "cell-stat text-center"><a className = "name" data-toggle="modal" data-target={"#account-modal"+this.state._id} href = "#">{this.state.author.fullName}</a>
          <AccountDetailModal mailId = {this.state._id}
                             author = {this.state.author.fullName}>
          </AccountDetailModal>
        <br /><span className = "small-letters">{unixTimeToString(this.state.postDate)}</span></th>
        <th className = "cell-stat text-center">{this.state.replyCount}<br /><span className = "small-letters">{this.state.viewCount}</span></th>
        <th className = "cell-stat text-center"><a className = "name" data-toggle="modal" data-target={"#account-modal"+this.state.lastReplyAuthor._id} href = "#">{this.state.lastReplyAuthor.fullName}</a>
          <AccountDetailModal mailId = {this.state.lastReplyAuthor._id}
                             author = {this.state.lastReplyAuthor.fullName}>
          </AccountDetailModal>
        <br /><span className = "small-letters">{unixTimeToString(this.state.lastReplyDate)}</span></th>
      </tr>
    );
  }
}
