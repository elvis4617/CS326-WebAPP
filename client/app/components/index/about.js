import React from 'react';

export default class About extends React.Component{
  render(){
    return(
      <div className="container">
        <div classNameName="row">
            <div className="col-lg-12 ">
                <h1 className="page-header">About US</h1>
                <ol className="breadcrumb">
                    <li><a href="index.html">Home</a>
                    </li>
                    <li className="active">About</li>
                </ol>
            </div>
        </div>
        <div className="row about-content">
            <div className="col-md-6">
                <img className="img-responsive" src="http://placehold.it/750x450" alt=""/>
            </div>
            <div className="col-md-6">
                <h2>About ToGather</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit tur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus repre.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit tur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis tur adipisicing elit. Sed voluptate nihil eum consectetur similique?</p>
            </div>
        </div>

        <div className="row about-content">
            <div className="col-lg-12">
                <h2 className="page-header">Our Team</h2>
            </div>
            <div className="col-md-4 text-center">
                <div className="thumbnail">
                    <img className="img-responsive developer-icon" src="img/elvis.png" alt=""/>
                    <div className="caption">
                        <h3>Elvis Chen<br/>
                            <small>Developer</small>
                        </h3>
                        <p>He is a dude.</p>
                        <ul className="list-inline">
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="thumbnail">
                    <img className="img-responsive developer-icon" src="img/andy.png" alt=""/>
                    <div className="caption">
                        <h3>Andy Liu<br/>
                            <small>Developer</small>
                        </h3>
                        <p>He is a guy wearing a glass with three hair.</p>
                        <ul className="list-inline">
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="thumbnail">
                    <img className="img-responsive developer-icon" src="img/minxin.png" alt=""/>
                    <div className="caption">
                        <h3>Minxin Gao<br/>
                            <small>developer</small>
                        </h3>
                        <p>He is a guy with two hair.</p>
                        <ul className="list-inline">
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="thumbnail">
                    <img className="img-responsive developer-icon" src="img/michael.png" alt=""/>
                    <div className="caption">
                        <h3>Michael Schmittlein<br/>
                            <small>Developer</small>
                        </h3>
                        <p>He is a emoji dude.</p>
                        <ul className="list-inline">
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="thumbnail">
                    <img className="img-responsive" src="http://placehold.it/750x450" alt=""/>
                    <div className="caption">
                        <h3>John O&#39;Brien<br/>
                            <small>Developer</small>
                        </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste saepe et quisquam nesciunt maxime.</p>
                        <ul className="list-inline">
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-github"></i></a>
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
