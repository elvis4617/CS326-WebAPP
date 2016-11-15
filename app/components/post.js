import React from 'react';

export default class Post extends React.Component{
  render(){
    return(
      <tr>
        <th colSpan = "2" className = "thread text-left"><a href="#">[CS326] Looking for a study group!</a></th>
        <th className = "cell-stat text-center"><a className = "name" href = "#">John Smith</a><br /><span className = "small-letters">10/4/2016 15:45</span></th>
        <th className = "cell-stat text-center">10<br /><span className = "small-letters">29</span></th>
        <th className = "cell-stat text-center"><a className = "name" href = "#">Jane Smith</a><br /><span className = "small-letters">10/5/2016 12:32</span></th>
      </tr>
    );
  }
}
