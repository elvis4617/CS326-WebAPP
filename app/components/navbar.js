import React from 'react';
import Reset_DB from './reset_db';
import { Link} from 'react-router';
import UnReadMsg from './unreadmsg'

export default class NavBar extends React.Component{

  render(){
    var data = this.state;
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
                  <Link to={'/Index'}>
                    <span className="navbar-brand logo" href="#">ToGather</span>
                  </Link>
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
                        <Reset_DB />
                      </li>
                      <li>
                        <Link to={'/Index'}>
                          <span href="#">Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/Notification'}>
                          <span href="#">Invitation</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/Forum'}>
                          <span href="">Forum</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/MyFriend'}>
                          <span href="#">Friends</span>
                        </Link>
                      </li>

                      <UnReadMsg user={this.props.user}/>

                      <li className="nav-icon">
                        <a className= "dropdown-toggle" data-toggle = "dropdown" href = "#">
                          <img width = "20px" className= "img-rounded" src = "img/testProfilePic.jpg"/>
                        </a>
                        <ul className= "dropdown-menu">
                          <li>
                            <Link to={'/MyProfile'}>
                              <span href = "#">View Profile</span>
                            </Link>
                          </li>
                          <li>
                            <a href = "#">Log Out</a>
                          </li>
                        </ul>
                      </li>
                  </ul>
              </div>

          </div>

      </nav>
    );
  }
}
