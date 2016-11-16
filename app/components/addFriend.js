import React from 'react';
import { Link} from 'react-router';

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
            <div className="panel panel-default friends-panel">
              <div className="panel-body">
                <div className="input-group friend-request">
                  <input type="text" className="form-control add-freind-input" placeholder="Send Request via Username"/>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-default">
                      <span className="glyphicon glyphicon-plus plus-icon"></span>
                    </button>
                  </span>
                </div>
                <hr/>
                <div className="input-group friend-request">
                  <input type="text" className="form-control add-friend-input" placeholder="Send Request via Email"/>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-default">
                      <span className="glyphicon glyphicon-plus plus-icon"></span>
                    </button>
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
