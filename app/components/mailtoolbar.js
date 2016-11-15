import React from 'react';

export default class MailToolBar extends React.Component {
  render(){
    return(
        <div className="row">
          <div className="btn-group pull-left n-toolbar" role="group" aria-label="...">
            <button type="button" className="btn btn-warning">Unread</button>
            <button type="button" className="btn btn-info">Participating</button>
            <button type="button" className="btn btn-primary active">All Notifications</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#entry-modal-1">Write</button>

          </div>
        </div>
    )
  }
}
