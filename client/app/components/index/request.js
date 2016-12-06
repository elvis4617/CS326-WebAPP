import React from 'react';
import {readRequest} from '../../server';
import { Link} from 'react-router';

export default class Request extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  handleUnReadClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedUnReadStatus) => {
      this.setState({read: updatedUnReadStatus});
      };
      readRequest(this.state._id, 1, callbackFunction);
    }
  }

  render(){
    return(
      <li >
          <span href = "#" onClick={(e) => this.handleUnReadClick(e)}>
            <Link to={'/Notification'}>
              <span>{this.state.content}</span>
            </Link>
          </span>
      </li>
    )
  }
}
