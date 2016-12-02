import React from 'react';

export default class Reset_DB extends React.Component{
  render() {
    return (
      <a href="#" onClick={() => {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/resetdb');
          xhr.addEventListener('load', function() {
            window.alert("Database reset! Refreshing the page now...");
            document.location.reload(false);
          });
          xhr.send();
        }}>Reset Mock DB</a>
      );
    }
}
