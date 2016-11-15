import React from 'react';
import {getUserDataByName} from '../server';

export default class AccountDetailModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getUserDataByName(this.props.author, (userData) => {
    this.setState(userData);
  });
 }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(

                <div className="modal fade" id={"account-modal"+this.props.mailId} role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h1>Account detail </h1>
                      </div>

                      <div className="modal-body">

                        <div className="row">
                          <div className="col-md-12">
                            <div className="media">
                              <div className="media-left media-top">
                                <img className="profpic" src = "img/testProfilePic.jpg"/>
                              </div>
                              <div className="media-body">
                                <h2>{this.state.contents.userName}</h2>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row info">
                          <h4>User Information:</h4>
                          <div className="col-md-12">
                            <label>Full name:</label>{this.state.contents.fullName}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-12">
                            <label>E-mail:</label>{this.state.contents.email}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-4">
                            <label>Grade:</label>{this.state.contents.grade}
                          </div>
                          <div className="col-md-8">
                            <label>Major:</label>{this.state.contents.major}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-12">
                            <label>Description:</label>{this.state.contents.description}
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
