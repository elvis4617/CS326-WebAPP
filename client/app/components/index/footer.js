import React from 'react';
import { Link} from 'react-router';

export default class Footer extends React.Component{

  githubClick(e){
    e.preventDefault();
    window.open("https://github.com/elvis4617/ToGather");
  }

  render(){
    return(
      <div className="wrapper">
      <footer className="footer-distributed">
        <div className="footer-right">

          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#" onClick={(e) => this.githubClick(e)}><i className="fa fa-github"></i></a>
        </div>

        <div className="footer-center">
          <h3>To<span>Gather</span></h3>
        </div>

        <div className="footer-left">

				<p className="footer-links">
          <Link to={'/Index'}>
            <span href="#" className="footer-nav">Home </span>
          </Link>
           ·
          <Link to={'/About'}>
            <span href="#" className="footer-nav">About </span>
          </Link>
           ·
          <Link to={'/Faq'}>
            <span href="#" className="footer-nav">Faq</span>
          </Link>
           ·
          <Link to={'/Contact'}>
            <span href="#" className="footer-nav">Contact</span>
          </Link>
				</p>

				<p>ToGather &copy; 2016</p>
			</div>
      </footer>
      </div>
    )
  }
}
