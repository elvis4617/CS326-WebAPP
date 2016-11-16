import React from 'react';


export default class MailBox extends React.Component{
  render(){
    return(

    <div className = "message-panel">
      <ul className="media-list">
      {React.Children.map(this.props.children, function(child) {
        if(child != null)
        return (
          <li className="media">
          {child}
          </li>
        )
      })}
      </ul>
    </div>
    )
  }
}
