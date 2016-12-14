import React from 'react';
import Friend from './friend';
import {getFriendDataById} from '../../server';
import { Link} from 'react-router';

export default class friendsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getFriendDataById(this.props.user, (userData) => {
    this.setState({contents: userData});

  });
 }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="row friend-div">
        <div className = "col-md-7 col-md-offset-3">
        <button type="button" className ="btn navbar-btn add-btn btn-friends btn-default">
          <span className ="glyphicon glyphicon-plus plus-icon"></span>
          <Link to={"/AddFriend"}>
            <span href="#"> Add Friend </span>
          </Link>
        </button>
        <hr />
          {this.state.contents.map((friend) => {
              return (
                <Friend key={parseInt((friend._id + ''), 16)} data={friend} />
              )
          })}
        </div>
      </div>
    )
  }
}
