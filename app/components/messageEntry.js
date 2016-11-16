import React from 'react';

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
    var message = this.state.value.trim();
    if (message !== "") {
      this.props.sendMessage(message);
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
            <div className ="form-group">
                <textarea className ="form-control"
                    rows = "1"
                    placeholder="Text"
                    value = {this.state.value}
                    onChange = {(e) => this.handleChange(e)} >
                    <div className ="input-group-btn">
                        <button type="submit" className="btn btn-default" onClick = {(e) => this.handleMessage(e)}>
                          <span className="glyphicon glyphicon-envelope" style="color:#337ab7"></span>
                        </button>
                    </div>
                </textarea>
            </div>
          </div>
        </li>
      </ul>
    </div>
    )
  }
}
