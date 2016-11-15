import React from 'react';

export default class NewThreadBox extends React.Component{
  render(){
    return(
      <div className = "panel panel-default">
        <div className = "panel-body">
          <div className = "row">
            <div className = "col-md-12">
              <h2> Post New Thread </h2>
              <div className = "input-group">
                <span className = "input-group-addon">Thread Title</span>
                <input type = "text" className ="form-control" placeholder="Thread Title"/>
              </div>
              <div className = "thread-body-container">
                <textarea className="thread-body"></textarea>
              </div>
              <div className = "submit-button">
                <a href = "#">
                  <button type = "button" className = "btn btn-primary pull-right">
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
