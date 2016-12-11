import React from 'react';
import {unixTimeToString} from '../../util'

export default class ThreadBody extends React.Component{

  // constructor(props){
  //   console.log("am i here");
  //   super(props);
  //   this.state = this.props.data;
  // }

  render(){
    return(
      <tbody>
        <tr>
          <td>
            <img src = "img/testProfilePic.jpg" alt/>
              <a className = "name" href = "#"> {this.props.author.fullName}</a>
          </td>
          <td>
              <span>{unixTimeToString(this.props.postDate)}</span>
            <p>{this.props.children}</p>
          </td>
        </tr>
      </tbody>
    );
  }
}
