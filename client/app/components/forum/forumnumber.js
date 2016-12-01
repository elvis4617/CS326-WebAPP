import React from 'react';

export default class ForumNumber extends React.Component{
  render(){
    return(
      <div className = "top-bar">

        <div className = "page-number pull-right">
          <strong>1</strong>
          <a href = "#">2</a>
          <a href = "#">3</a>
          <a href = "#">4</a>
          <a href = "#">5</a>
          <a href = "#">6</a>
          <a href = "#">...10</a>
          <a href = "#">Next Page</a>
        </div>
      </div>
    );
  }
}
