import React from 'react';
//import {unixTimeToString} from '../../util'

export default class ThreadBody extends React.Component{

  constructor(props){
    super(props);
    this.state = this.props.data;
  }

  render(){
    return(
      <tbody>
        <tr>
          <td>
            <img src = "img/testProfilePic.jpg" alt/>
              <a className = "name" href = "#"> {this.state.author}</a>
          </td>
          <td>
              <span>{unixTimeToString(this.state.postDate)}</span>
            <p>{this.state.content}</p>
          </td>
        </tr>
      </tbody>
    );
  }
}
