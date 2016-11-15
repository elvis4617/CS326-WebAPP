import React from 'react';
import {unixTimeToString} from '../util'

export default class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.data;
  }

  render(){
    return(
      // <tr>
      //   <th colSpan = "2" className = "thread text-left"><a href="#">[CS326] Looking for a study group!</a></th>
      //   <th className = "cell-stat text-center"><a className = "name" href = "#">John Smith</a><br /><span className = "small-letters">10/4/2016 15:45</span></th>
      //   <th className = "cell-stat text-center">10<br /><span className = "small-letters">29</span></th>
      //   <th className = "cell-stat text-center"><a className = "name" href = "#">Jane Smith</a><br /><span className = "small-letters">10/5/2016 12:32</span></th>
      // </tr>
      <tr>
        <th colSpan = "2" className = "thread text-left"><a href="#">{this.state.title}</a></th>
        <th className = "cell-stat text-center"><a className = "name" href = "#">{this.state.author}</a><br /><span className = "small-letters">{unixTimeToString(this.state.postDate)}</span></th>
        <th className = "cell-stat text-center">{this.state.replyCount}<br /><span className = "small-letters">{this.state.viewCount}</span></th>
        <th className = "cell-stat text-center"><a className = "name" href = "#">{this.state.lastReplyAuthor}</a><br /><span className = "small-letters">{unixTimeToString(this.state.lastReplyDate)}</span></th>
      </tr>
    );
  }
}
