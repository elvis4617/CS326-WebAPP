import React from 'react';
import {getUserDataById} from '../server';
import {updateUserInfo} from '../server';

export default class AccountFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      name: "",
      email: "",
      grade: "",
      major: "",
      description: ""
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

  handleChangeName(e) {
  e.preventDefault();
  this.setState({name: e.target.value});
  }
  handleChangeEmail(e) {
  e.preventDefault();
  this.setState({email: e.target.value});
  }
  handleChangeGrade(e) {
  e.preventDefault();
  this.setState({grade: e.target.value});
  }
  handleChangeMajor(e) {
  e.preventDefault();
  this.setState({major: e.target.value});
  }
  handleChangeDescription(e) {
  e.preventDefault();
  this.setState({description: e.target.value});
  }

  handleUpdateUserInfo(e) {
  e.preventDefault();
  if(this.props.name == "" ||
      this.props.email == "" ||
      this.props.grade == "" ||
      this.props.major == "" ||
      this.props.description == "")
      alert("You must fill in all fields before commit any changes.");
  else
    updateUserInfo(this.props.user,
                  this.state.name,
                  this.state.email,
                  this.state.grade,
                  this.state.major,
                  this.state.description,
                  (userData) => {
                  this.setState(userData);
                });
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
              <div className="col-md-12">
                <label>Grade:</label>{this.state.contents.grade}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-12">
                <label>Major:</label>{this.state.contents.major}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-12">
                <label>Description</label>{this.state.contents.description}
              </div>
            </div>
            <div className="row text">
              <div className="col-md-12">
                <label>Group</label>{this.state.contents.groupList}
              </div>
            </div>
            <br/>

            <div className="row input">
              <h4>Edit Information:</h4>
              <div className="col-md-8">
                <form>
                  <label>*Name:</label>
                  <input type="text"
                         name="fullName"
                         onChange={(e) => this.handleChangeName(e)}/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>*E-mail:</label>
                  <input type="text"
                         name="email"
                         onChange={(e) => this.handleChangeEmail(e)}/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>*Grade:</label>
                  <input type="text"
                         name="grade"
                         onChange={(e) => this.handleChangeGrade(e)}/>
                </form>
              </div>
              <div className="col-md-8">
                <form>
                  <label>*Major:</label>
                  <input type="text"
                         name="major"
                         onChange={(e) => this.handleChangeMajor(e)}/>
                </form>
              </div>
            </div>
            <div className="row text">
              <div className="col-md-8">
                <form>
                  <label>*Description:</label>
                  <textarea className="description"
                            type="text"
                            name="description"
                            draggable="false"
                            onChange={(e) => this.handleChangeDescription(e)}>
                  </textarea>
                </form>
              </div>
            </div>
            <div className="row submit">
              <div className="col-md-12">
                <button type="button"
                  onClick={(e) => this.handleUpdateUserInfo(e)}>
                  Submit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
