import React from 'react';

export default class Mail extends React.Component {
  render(){
    return(
      <div>
      <div className="media">
        <div className="media-left media-top">
          <img className="media-object" src="img/pineapple_profile_pic.png" alt="Generic placeholder image"/>
        </div>
        <div className="media-body">
          <div className="media-body">
              <a href="#">{this.props.author}</a>
              <br /> {this.props.title}
              <br /><span className="pull-right"><a href="#" >Accepted</a> · <a href="#" >Peace Out</a> · <a type="button" data-toggle="modal" data-target="#modal-content-1">Details</a> · {this.props.createDate}</span>
                <div className="modal fade" id="modal-content-1" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Join Us Now! <small>Someone</small></h4>
                      </div>
                      <div className="modal-body">
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
          </div>
        </div>
      </div>
    </div>
    )
  }
}
