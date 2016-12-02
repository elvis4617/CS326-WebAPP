import React from 'react';
import {onMessage} from '../../server';

export default class MessageEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  handleMessage(e) {
    e.preventDefault();
    // Trim whitespace from beginning + end of entry.
    var status;
    var message = this.state.value.trim();
    if (message !== "") {
      onMessage(message, 1, this.props.friendId, (result) => {return(status = result)});
      // Reset status update.
      this.setState({value: ""});
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }
  render() {
    return (
    <div>
      <ul className ="media-list">
        <li className ="media">
          <div className ="media-body">
            Send Message:
            <div className ="input-group">
                <input className = "form-control"
                       type = "text"
                       placeholder="Text"
                       value = {this.state.value}
                       onChange = {(e) => this.handleChange(e)} />
                    <div className ="input-group-btn">
                        <button type="submit" className="btn btn-default" onClick = {(e) => this.handleMessage(e)}>
                          <span className="glyphicon glyphicon-envelope" ></span>
                        </button>
                    </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    )
  }
}
