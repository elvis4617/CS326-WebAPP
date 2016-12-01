import React from 'react';

export default class NewThreadBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value1 : "",
      value2 : ""
    };
  }

  handlePost(e){
    e.preventDefault();
    var threadTitle = this.state.value1.trim();
    var threadContent = this.state.value2.trim();
    if (threadTitle !== "" && threadContent !== ""){
      this.props.onPost(threadTitle, threadContent);
      this.setState({value1: ""});
      this.setState({value2: ""});
    }
  }

  handleChange1(e){
    e.preventDefault();
    this.setState({value1: e.target.value});
  }

  handleChange2(e){
    e.preventDefault();
    this.setState({value2: e.target.value});
  }

  render(){
    return(
      <div className = "panel panel-default">
        <div className = "panel-body">
          <div className = "row">
            <div className = "col-md-12">
              <h2> Post New Thread </h2>
              <div className = "input-group">
                <span className = "input-group-addon">Thread Title</span>
                <input type = "text" className ="form-control" placeholder="Thread Title"
                  onChange = {(e)=> this.handleChange1(e)}/>
              </div>
              <div className = "thread-body-container">
                <textarea className="thread-body"
                          onChange={(e) => this.handleChange2(e)}/>
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
        </div>
      </div>
    );
  }
}
