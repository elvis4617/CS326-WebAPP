import React from 'react';
import {readRequest} from '../../server';

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
        <a href = "#" onClick={(e) => this.handleUnReadClick(e)}>{this.state.content}</a>
      </li>
    )
  }
}
