import React from 'react';
import friend from './friend';

export default class friendsFeed extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  render() {
    return (
      <div className = "col-md-7 col-md-offset-3">
      <button type="button" className ="btn navbar-btn add-btn btn-friends btn-default">
        <span className ="glyphicon glyphicon-plus" style="color:#337ab7"></span>
        <a color = "#337ab7" href="friends_add_friend.html"> Add Friend </a>
      </button>
      <hr />
      {this.state.contents.map((friend) => {
          return (
            <friend key={friend._id} data={friend} />
          )
      })}
      </div>
    )
  }
}
