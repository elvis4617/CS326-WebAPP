import React from 'react';
import messageEntry from './messageEntry';
import {onMessage} from '../server';

export default class friend extends React.Component {
  constructor(props) {
    super(props);
    // The Friend's initial state is what the Feed passed to us.
    this.state = props.data;
  }

  render() {
    //var data = this.state;
    return (
      <div className ="panel panel-default friends-panel">
        <div className ="panel-body">
          <div className ="row">

            <div className ="col-md-12">
              <div className ="media">
                <div className ="media-left media-top">
                  data.contents.profilePic
                </div>
                <div className ="media-body">
                  <a href="#">data.contents.fullName</a>
                  <br>
                    data.contents.school
                  </br>
                </div>
              </div>
            </div>
          </div>
          <hr>
          </hr>
          <messageEntry sendMessage = {(message) => onMessage(message, 2, this._id)}/>
        </div>
      </div>
    )
  }
}
