import React from 'react';

export default class Recommend_Left extends React.Component{
  render(){
    return (
      <div className="content-section-a">
          <div className="container">
              <div className="row">
                  <div className="col-lg-5 col-sm-6">
                      <hr className="section-heading-spacer"/>
                      <div className="clearfix"></div>
                      <h2 className="section-heading">Lorem ipsum dolor sit amet.<br/>Praesent consequat.</h2>
                      <p className="lead">Nulla feugiat vel eros <a target="_blank" href="#">Donec vehicula tincidunt varius Mauris</a> in eros eleifend, luctus lacus eu, porttitor orci. Phasellus hendrerit mi at nunc lobortis, in viverra elit.</p>
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
