import React from 'react';
import {onRequest} from '../../server';

export default class RequestEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      request: null
    };
  }

  handleRequest(e) {
    e.preventDefault();
    onRequest(this.state.value, "000000000000000000000001", function(res){
      
    });
    // Reset status update.
    this.setState({value: ""});
    }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="panel panel-default friends-panel">
        <div className="panel-body">
          <div className="input-group friend-request">
            <input type="text"
              className="form-control add-freind-input"
              placeholder="Send Request via Username"
              value = {this.state.value}
              onChange = {(e) => this.handleChange(e)}/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default" onClick = {(e) => this.handleRequest(e)}>
                <span className="glyphicon glyphicon-plus plus-icon"></span>
              </button>
            </span>
          </div>
      </div>
    </div>
    )
  }
}
