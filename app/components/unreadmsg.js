import React from 'react';
import Request from './request';
//import {Link} from 'react-router';
import {getUnReadMsgs} from '../server'

export default class UnReadMsg extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getUnReadMsgs(this.props.user, (unReadList) => {
    this.setState(unReadList);
  });
 }

  componentDidMount() {
    this.refresh();
  }

  handleUpdateUnRead(blurEvent){
    blurEvent.preventDefault();
    this.refresh();
  }

  render(){
    var length = this.state.contents.length;
    var badge;
    if(length > 0)
      badge=(
        <span className= "badge">{length}</span>
      );
    else {
      badge = null;
    }

    return(
      <li className="nav-icon" onBlur={(e) => this.handleUpdateUnRead(e)}>
        <a className= "dropdown-toggle" data-toggle = "dropdown" href = "#">
          <span className= "glyphicon glyphicon-envelope"></span>
          {badge}
        </a>
        <ul className= "dropdown-menu">
          {this.state.contents.map((reqItem) => {
              return(
                <Request key={reqItem._id}
                          data={reqItem}/>
              )
            }
          )}
        </ul>
      </li>
    )
  }
}
