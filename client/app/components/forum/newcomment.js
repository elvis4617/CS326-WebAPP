import React from 'react';

export default class NewCommentBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : ""
    };
  }

  handlePost(e){
    e.preventDefault();
    var replyContent = this.state.value2.trim();
    if (replyContent !== ""){
      this.props.onPost(replyContent);
      this.setState({value: ""});
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render(){
    return(
          <div className = "row">
            <div className = "col-md-12">
              <h2 className = "pull-left"> Reply to Thread </h2>
              <div className = "thread-body-container">
                <textarea className="comment-box"
                          onChange={(e) => this.handleChange(e)}/>
              </div>
              <div className = "submit-button">
                <a href = "#">
                  <button type = "button" className = "btn btn-primary pull-right"
                    onClick = {(e) => this.handlePost(e)}>
                    <span className = "glyphicon glyphicon-ok"></span>Submit
                  </button>
                </a>
              </div>
            </div>
          </div>
    );
  }
}
