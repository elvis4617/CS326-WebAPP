import React from 'react';
import {getUserDataById} from '../server';
import {updateUserInfo} from '../server';

export default class AccountFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      value: "",
      update: ""
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

  handleChange(e,name) {
  // Prevent the event from "bubbling" up the DOM tree.
  e.preventDefault();
  // e.target is the React Virtual DOM target of the
  // input event -- the <textarea> element. The textarea's
  // `value` is the entire contents of what the user has
  // typed in so far.
  this.setState({value: e.target.value,
                 update: name});
  }

  handlePost(e) {
 // Prevent the event from "bubbling" up the DOM tree.
  e.preventDefault();
  // Trim whitespace from beginning + end of entry.
  //console.log(this.state.value)
  this.setState(updateUserInfo(this.props.user,this.state.value,this.state.update));
    // Reset status update.
  this.setState({value: ""});
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
                  <label>Name:</label>
                  <input type="text"
                         name="fullName"
                         onChange={(e) => this.handleChange(e,"fullName")}/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>E-mail:</label>
                  <input type="text"
                         name="email"
                         onChange={(e) => this.handleChange(e,"email")}/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>Grade:</label>
                  <input type="text"
                         name="grade"
                         onChange={(e) => this.handleChange(e,"grade")}/>
                </form>
              </div>
              <div className="col-md-8">
                <form>
                  <label>Major:</label>
                  <input type="text"
                         name="major"
                         onChange={(e) => this.handleChange(e,"major")}/>
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
                <button type="button"
                  onClick={(e) => this.handlePost(e)}>
                  Submit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
