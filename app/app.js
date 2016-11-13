import React from 'react';
import ReactDOM from 'react-dom';
import MailBoxThread from './components/mailboxthread';
import NavBar from './components/navbar';
import Landing from './components/landing';
import Recommend_Left from './components/Recommend_Left';
import Recommend_Right from './components/Recommend_Right';
import Footer from './components/footer';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Landing />
        <Recommend_Left />
        <Recommend_Right />
        <Recommend_Left />
        <Footer />
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
