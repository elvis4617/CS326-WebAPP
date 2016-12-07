import React from 'react';

export default class Contact extends React.Component{
  render(){
    return(
      <div className="container">

        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">Contact US</h1>
                <ol className="breadcrumb">
                    <li><a href="index.html">Home</a>
                    </li>
                    <li className="active">Contact</li>
                </ol>
            </div>
        </div>

        <div className="row">
            <div className="col-md-8">
                <iframe width="100%" height="400px" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="http://maps.google.com/maps?hl=en&amp;ie=UTF8&amp;ll=37.0625,-95.677068&amp;spn=56.506174,79.013672&amp;t=m&amp;z=4&amp;output=embed"></iframe>
            </div>
            <div className="col-md-4">
                <h3>Contact Details</h3>
                <p>
                    University of Massachusetts<br/>Amherst, MA 01003<br/>
                </p>
                <p><i className="fa fa-phone"> </i>
                   Phone: (123) 456-7890</p>
                <p><i className="fa fa-envelope-o"> </i>
                    Email: <a href="mailto:name@example.com">name@example.com</a>
                </p>
                <p><i className="fa fa-clock-o"> </i>
                     Hour: Monday - Friday: 9:00 AM to 5:00 PM</p>
                <ul className="list-unstyled list-inline list-social-icons">
                    <li>
                        <a href="#"><i className="fa fa-facebook fa-2x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-linkedin fa-2x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-twitter fa-2x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-github fa-2x"></i></a>
                    </li>
                </ul>
            </div>
        </div>

        <div className="row">
            <div className="col-md-8">
                <h3>Send us a Message</h3>
                <form name="sentMessage" id="contactForm" noValidate>
                    <div className="control-group form-group">
                        <div className="controls">
                            <label>Full Name:</label>
                            <input type="text" className="form-control" id="name" required data-validation-required-message="Please enter your name."/>
                            <p className="help-block"></p>
                        </div>
                    </div>
                    <div className="control-group form-group">
                        <div className="controls">
                            <label>Phone Number:</label>
                            <input type="tel" className="form-control" id="phone" required data-validation-required-message="Please enter your phone number."/>
                        </div>
                    </div>
                    <div className="control-group form-group">
                        <div className="controls">
                            <label>Email Address:</label>
                            <input type="email" className="form-control" id="email" required data-validation-required-message="Please enter your email address."/>
                        </div>
                    </div>
                    <div className="control-group form-group">
                        <div className="controls">
                            <label>Message:</label>
                            <textarea rows="10" cols="100" className="form-control contact-message" id="message" required data-validation-required-message="Please enter your message" maxLength="999"></textarea>
                        </div>
                    </div>
                    <div id="success"></div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    </div>
    )
  }
}
