import React from 'react';
import {resetDatabase} from '../../database'

export default class Reset_DB extends React.Component{
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/resetdb');
          xhr.addEventListener('load', function() {
            window.alert("Database reset! Refreshing the page now...");
            document.location.reload(false);
          });
          xhr.send();
        }}>Reset Mock DB</button>
      );
    }
}
