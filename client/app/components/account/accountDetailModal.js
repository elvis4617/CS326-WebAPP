import React from 'react';  

export default class AccountDetailModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {

    this.setState({contents:this.props.author});

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
                                <h2>{this.props.author.userName}</h2>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row info">
                          <h4>User Information:</h4>
                          <div className="col-md-12">
                            <label>Full name:</label>{this.props.author.fullName}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-12">
                            <label>E-mail:</label>{this.props.author.email}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-5">
                            <label>Grade:</label>{this.props.author.grade}
                          </div>
                          <div className="col-md-7">
                            <label>Major:</label>{this.props.author.major}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-12">
                            <label>Description:</label>{this.props.author.description}
                          </div>
                        </div>

                        <div className="row text">
                          <div className="col-md-12">
                            <label >Group:</label>
                            {
                              this.props.author.groupList.map((group, i) => {
                                return(
                                  <span key={i}>
                                  {group.groupName}
                                </span>
                                )
                              })


                            }
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
