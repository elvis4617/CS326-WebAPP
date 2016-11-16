import React from 'react';
import {unixTimeToString} from '../util'

export default class GroupModal extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render(){
    return(
      <div className="modal fade" id={"group-modal"+this.props.groupID} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <div className="row">
                <div className="col-md-12">
                  <div className="media">
                    <div className="media-left media-top">
                      <img className="profpic" src = "img/testProfilePic.jpg"/>
                    </div>
                    <div className="media-body">
                      <h2>{this.state.groupName}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-body">


              <div className="row">
                  <div className="col-md-12">
                    <h4>{this.state.description}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  Members: {this.state.memberCount}
                </div>
                <div className="col-md-8 pull-right">
                  Last Active: {unixTimeToString(this.state.lastActiveDate)}
                </div>
              </div>
              <div className="row button">
                <div className="col-md-12">
                  <p>THIS IS THE OWNER: {this.state.groupOwner}, CONTACT THE OWNER IF YOU WANT IN</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
