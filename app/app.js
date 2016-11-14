import React from 'react';
import ReactDOM from 'react-dom';
import MailBoxThread from './components/mailboxthread';
import NavBar from './components/navbar';
import Landing from './components/landing';
import Recommend from './components/Recommend';
import Recommend_Left from './components/recommend_left';
import Recommend_Right from './components/recommend_right';
import Footer from './components/footer';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Landing />
        <Recommend user={2} />
        <Footer />
      </div>
    );
  }
}


class NotificationPage extends React.Component {
  render() {
    return (
      <div>
        <MailBoxThread />;
        <Footer />
      </div>
    )
  }
}

class App extends React.Component {
    render() {
      return (
        <div>
        <NavBar user={2 } />
        {this.props.children}
        </div>
      );
    }
  }


  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/Index" component={LandingPage} />
        <Route path="/Notification" component={NotificationPage} />
        //some
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
