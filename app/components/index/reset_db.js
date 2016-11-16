import React from 'react';
import {resetDatabase} from '../../database'

export default class Reset_DB extends React.Component{
  render(){
    return(
      <a href="#" onClick={() => {
              resetDatabase();
              window.alert("Database reset! Refreshing the page now...");
              window.location.reload(true);
            }}>Reset DB</a>
    );
  }
}
