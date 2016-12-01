import React from 'react';
import { Link} from 'react-router';
import {onRequest} from '../../server';
import RequestEntry from './requestEntry';

export default class AddFriendPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  render() {
    return (
      <div className = "container">
        <div className = "row add-friend-panel">
          <div className = "col-md-7 col-md-offset-3">
            <button type="button" className="btn navbar-btn add-btn btn-friends btn-default">
              <span className="glyphicon glyphicon-user plus-icon"></span>
              <Link to={"/MyFriend"}>
                <span color = "#337ab7" href="friends_my_friends.html">My Friends</span>
              </Link>
            </button>
            <hr/>
            <RequestEntry sendRequest = {(username, email) => onRequest(username, email, 2)}/>
          </div>
        </div>
      </div>
    )
  }
}
