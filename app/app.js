import React from 'react';
import ReactDOM from 'react-dom';
import MailBox from './components/mailbox';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

// Fake Home Page
class LandingPage extends React.Component {
  render() {
    return (
      <p>I am Fake</p>
    );
  }
}

class NotificationPage extends React.Component {
  render() {
    return <MailBox />;
  }
}

class App extends React.Component {
    render() {
      return (
        <div>{this.props.children}</div>
      )
    }
  }

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="notification" component={NotificationPage} />
    </Route>
  </Router>
),document.getElementById('thebody'));
