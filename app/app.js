import React from 'react';
import ReactDOM from 'react-dom';
import MailBoxThread from './components/mailboxthread';
import NavBar from './components/navbar';
import { IndexRoute, Router, Route, browserHistory, Link} from 'react-router';

// Fake Home Page
class LandingPage extends React.Component {
  render() {
    return (
      <div>
      <p>I am Fake</p>
      <p>I am Fake</p>
      <p>I am Fake</p>
      <p>I am Fake</p>
      <p>I am Fake</p>
      <Link to="/Notification">
          whatever
        </Link>
      </div>
    );
  }
}


class NotificationPage extends React.Component {
  render() {
    return <MailBoxThread />;
  }
}

class App extends React.Component {
    render() {
      return (
        <div>
        <NavBar />
        {this.props.children}
        </div>
      );
    }
  }


  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/Notification" component={NotificationPage} />
      </Route>
    </Router>
  ),
  document.getElementById('mybody')
);

/*

  ReactDOM.render(
  <LandingPage />,
  document.getElementById('mybody')
  );
*/
