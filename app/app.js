import React from 'react';
import ReactDOM from 'react-dom';
import MailBoxThread from './components/mailboxthread';
import NavBar from './components/navbar';
import Landing from './components/landing';
import Recommend from './components/Recommend';
import Footer from './components/footer';
import friendsFeed from './components/friendsFeed';
import accountFeed from './components/accountFeed';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ForumItem from './components/forumitem'

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
        <MailBoxThread />
        <Footer />
      </div>
    )
  }
}

class FriendsPage extends React.Component {
  render() {
    return (
      <div>
        <friendsFeed user={2} />
      </div>
    )
  }
}

class AccountPage extends React.Component {
  render(){
    return (
      <div>
        <accountFeed />
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

  class ForumPage extends React.Component{
    render(){
      return(
        <div>
          <ForumItem />
        </div>
      )
    }
  }


  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/Index" component={LandingPage} />
        <Route path="/Notification" component={NotificationPage} />
        <Route path="/Forum" component = {ForumPage} />
        <Route path="/MyFriend" component={FriendsPage} />
        <Route path="/MyProfile" component={AccountPage}/>
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
