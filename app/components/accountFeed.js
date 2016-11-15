import React from 'react';
import {getUserDataById} from '../server';

export default class AccountFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getUserDataById(this.props.user, (userData) => {
    this.setState(userData);
  });
 }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container content">
        <div className="row">
          <div className="col-md-7 col-md-offset-3">
            <div className="page-header">
              <h1>Account detail </h1>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="media">
                  <div className="media-left media-top">
                    <img className="profpic" src = "img/testProfilePic.jpg"/>
                  </div>
                  <div className="media-body">
                    <h2>{this.state.contents.userName}</h2>
                  </div>
                </div>
              </div>
            </div>

            <br/>
            <div className="row info">
              <h4>User Information:</h4>
              <div className="col-md-12">
                <label>Full Name:</label>{this.state.contents.fullName}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-12">
                <label>E-mail:</label>{this.state.contents.email}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-4">
                <label>Grade:</label>{this.state.contents.grade}
              </div>
              <div className="col-md-8">
                <label>Major:</label>{this.state.contents.major}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-12">
                <label>Description</label>{this.state.contents.description}
              </div>
            </div>
            <br/>

            <div className="row input">
              <h4>Edit Information:</h4>
              <div className="col-md-8">
                <form>
                  <label>First name:</label>
                  <input type="text" name="firstname"/>
                </form>
              </div>
              <div className="col-md-8">
                <form>
                  <label>Last name:</label>
                  <input type="text" name="lastname"/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>E-mail:</label>
                  <input type="text" name="e-mail"/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>Grade:</label>
                  <input type="text" name="grade"/>
                </form>
              </div>
              <div className="col-md-8">
                <form>
                  <label>Major:</label>
                  <input type="text" name="major"/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>Description:</label>
                  <textarea className="description" type="text" name="description" draggable="false">
                  </textarea>
                </form>
              </div>
            </div>
            <div className="row submit">
              <div className="col-md-12">
                <button type="button">Submit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
