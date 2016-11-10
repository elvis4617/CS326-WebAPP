import React from 'react';

export default class NavBar extends React.Component{
  render(){
    return (
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
          <div className="container topnav">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand logo" href="index.html">ToGather</a>
                  <form className= "navbar-form navbar-left" role ="search">
                    <div className= "input-group">
                      <input type ="text" className= "form-control" placeholder="Search ToGather" />
                        <span className= "input-group-btn">
                          <button type = "button" className= "btn btn-default">
                            <span className= "glyphicon glyphicon-search"></span>
                          </button>
                        </span>
                    </div>
                  </form>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right list-inline">
                      <li>
                          <a href="index.html">Home</a>
                      </li>
                      <li>
                          <a href="notifications.html">Invitation</a>
                      </li>
                      <li>
                          <a href="forum.html">Forum</a>
                      </li>
                      <li>
                          <a href="friends_my_friends.html">Friends</a>
                      </li>

                      <li>
                        <a className= "dropdown-toggle" data-toggle = "dropdown" href = "#">
                          <span className= "glyphicon glyphicon-bell"></span>
                          <span className= "badge">3</span>
                        </a>

                        <ul className= "dropdown-menu">
                          <li><a href = "#">Test Notification 1</a></li>
                          <li><a href = "#">Test Notification 2</a></li>
                          <li><a href = "#">Test Notification 3</a></li>
                        </ul>
                      </li>

                      <li className="nav-icon">
                        <a className= "dropdown-toggle" data-toggle = "dropdown" href = "#">
                          <span className= "glyphicon glyphicon-envelope"></span>
                          <span className= "badge">2</span>
                        </a>
                        <ul className= "dropdown-menu">
                          <li><a href = "#">Test Message 1</a></li>
                          <li><a href = "#">Test Message 2</a></li>
                        </ul>
                      </li>

                      <li className="nav-icon">
                        <a className= "dropdown-toggle" data-toggle = "dropdown" href = "#">
                          <img width = "20px" className= "img-rounded" src = "img/testProfilePic.jpg"/>
                        </a>
                        <ul className= "dropdown-menu">
                          <li><a href = "account.html">View Profile</a></li>
                          <li><a href = "#">Log Out</a></li>
                        </ul>
                      </li>
                  </ul>
              </div>

          </div>

      </nav>
    );
  }
}
