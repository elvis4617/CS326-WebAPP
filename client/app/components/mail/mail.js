import React from 'react';
import MailModal from './mailmodal';
import AccountDetailModal from '../account/accountDetailModal';
import {unixTimeToString} from '../../util';

//import { Link} from 'react-router';

export default class Mail extends React.Component {

  handleAccept(e){
    e.preventDefault();
    if(!this.props.status){
      if(this.props.type == "invite")
        this.props.onAccept(this.props.reciever, this.props.group, this.props.mailId);
      else
        this.props.onAccept(this.props.author, this.props.group, this.props.mailId);
    }
  }

  render(){
    var acceptStatus = "Accept"
    if(this.props.status)
      acceptStatus = "Accepted";
    if(this.props.author === "Someone")
      acceptStatus ="";

    return(
      <div>
      <div className="media">
        <div className="media-left media-top">
          <img className="media-object" src="img/pineapple_profile_pic.png" alt="Generic placeholder image"/>
        </div>
        <div className="media-body">
          <div className="media-body">

              <a type="button" data-toggle="modal" data-target={"#account-modal"+this.props.mailId+"1"}>{this.props.author}</a>&lsquo;s {this.props.type} to
              <a type="button" data-toggle="modal" data-target={"#account-modal"+this.props.mailId+"2"}> {this.props.reciever}</a>
              <AccountDetailModal mailId={this.props.mailId + "1"}
                         author={this.props.author}>
              </AccountDetailModal>
              <AccountDetailModal mailId={this.props.mailId + "2"}
                         author={this.props.reciever}>
              </AccountDetailModal>

              <br /> {this.props.title}
              <br /><span className="pull-right"><a type="button" onClick={(e) => this.handleAccept(e)}>{acceptStatus}</a> · <a type="button" data-toggle="modal" data-target={"#modal-content"+this.props.mailId}>Details</a> · {unixTimeToString(this.props.createDate)}</span>
                <MailModal mailId={this.props.mailId}
                           author={this.props.author}
                           title={this.props.title}
                           createDate={this.props.createDate}
                           group = {this.props.group}
                           mailType ={this.props.type}>
                           {this.props.children}
                </MailModal>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
