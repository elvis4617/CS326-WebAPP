import React from 'react';
import { Link} from 'react-router';

export default class Footer extends React.Component{
  render(){
    return(
      <footer>
          <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                      <ul className="list-inline">
                          <li>
                              <Link to="/Index">
                                <span className = "footer-nav" href="#">Home</span>
                              </Link>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span className = "footer-nav" href="#about">About</span>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span className = "footer-nav" href="#services">Services</span>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span className = "footer-nav" href="#contact">Contact</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
    )
  }
}
