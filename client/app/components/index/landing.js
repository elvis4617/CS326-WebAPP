import React from 'react';

export default class Landing extends React.Component{
  render(){
    return(
      <div className="intro-header">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="intro-message">
                          <h1>To Gather</h1>
                          <h3>A study group by your choice</h3>
                          <hr className="intro-divider"/>
                          <ul className="list-inline intro-social-buttons">
                              <li>
                                  <a href="#" className="btn btn-default btn-lg index-btn"><span className="start-btn">Start</span></a>
                              </li>
                              <li>
                                  <a href="#" className="btn btn-default btn-lg index-btn"><span className="start-btn">Login</span></a>
                              </li>
                              <li>
                                  <a href="#" className="btn btn-default btn-lg index-btn"><span className="start-btn">Signup</span></a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
