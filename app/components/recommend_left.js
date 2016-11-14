import React from 'react';
import {unixTimeToString} from '../util'

export default class Recommend_Left extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render(){
    return (
      <div className="content-section-a">
          <div className="container">
              <div className="row">
                  <div className="col-lg-5 col-sm-6">
                      <hr className="section-heading-spacer"/>
                      <div className="clearfix"></div>
                      <h2 className="section-heading">{this.state.title}</h2>
                      <p className="lead">{this.state.content}</p>
                      <p >View Count: ({this.state.viewCount})</p>
                      <p >{unixTimeToString(this.state.postDate)}</p>
                  </div>
                  <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                      <img className="img-responsive" src="img/ipad.png" alt=""/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
