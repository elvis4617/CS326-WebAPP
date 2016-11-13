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
                              <Link to="./Index">
                                <span href="#">Home</span>
                              </Link>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span href="#about">About</span>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span href="#services">Services</span>
                          </li>
                          <li className="footer-menu-divider">&sdot;</li>
                          <li>
                              <span href="#contact">Contact</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
    )
  }
}
