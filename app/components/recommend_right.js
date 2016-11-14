import React from 'react';
import {unixTimeToString} from '../util'

export default class Recommend_Right extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render(){
    return (
      <div className="content-section-b">

          <div className="container">

              <div className="row">
                  <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                      <hr className="section-heading-spacer"/>
                      <div className="clearfix"></div>
                      <h2 className="section-heading">{this.state.title}</h2>
                      <p className="lead">{this.state.content}</p>
                      <p >View Count: ({this.state.viewCount})</p>
                      <p >{unixTimeToString(this.state.postDate)}</p>
                  </div>
                  <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                      <img className="img-responsive" src="img/dog.png" alt=""/>
                  </div>
              </div>

          </div>
      </div>
    );
  }
}
