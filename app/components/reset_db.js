import React from 'react';
import {resetDatabase} from '../database'

export default class Reset_DB extends React.Component{
  render(){
    return(
      <span href="#" onClick={() => {
              resetDatabase();
              window.alert("Database reset! Refreshing the page now...");
              document.location.reload(false);
            }}>Reset DB</span>
    );
  }
}
