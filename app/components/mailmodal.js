import React from 'react';

export default class MailModal extends React.Component {
  render(){
    return(

                <div className="modal fade" id={"modal-content"+this.props.mailId} role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{this.props.title} <small>{this.props.author}</small></h4>
                      </div>
                      <div className="modal-body">
                        <p> A {this.props.mailType} to join {this.props.group} </p>
                        <p>
                          {this.props.children}
                        </p>
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
