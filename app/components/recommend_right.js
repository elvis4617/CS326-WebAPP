import React from 'react';

export default class Recommend_Right extends React.Component{
  render(){
    return (
      <div className="content-section-b">

          <div className="container">

              <div className="row">
                  <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                      <hr className="section-heading-spacer"/>
                      <div className="clearfix"></div>
                      <h2 className="section-heading">Cras dignissim dui<br/>Curabitur blandit</h2>
                      <p className="lead">Nullam vel massa pharetra, posuere neque euismod, mattis metus. Etiam neque ante, dapibus sed <a target="_blank" href="#">Lubas</a> eu, tempor id augue. Vivamus gravida mi quis vehicula vulputate.</p>
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
