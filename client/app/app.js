import React from 'react';
import ReactDOM from 'react-dom';
import MailBoxThread from './components/mail/mailboxthread';
import NavBar from './components/index/navbar';
import Landing from './components/index/landing';
import Recommend from './components/index/recommend';
import Footer from './components/index/footer';
import FriendsFeed from './components/friend/friendsFeed';
import AccountFeed from './components/account/accountFeed';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ForumItem from './components/forum/forumitem';
import AddFriendPage from './components/friend/addFriend';
import SearchResultPage from './components/index/searchresultpage';
import ErrorBanner from './components/utility/errorBanner';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Landing />
        <Recommend user={1} />
        <Footer />
      </div>
    );
  }
}


class NotificationPage extends React.Component {
  render() {
    return (
      <div>
        <MailBoxThread user={1} />
        <Footer />
      </div>
    )
  }
}

class FriendsPage extends React.Component {
  render() {
    return (
      <div>
        <FriendsFeed user={1} />
        <Footer />
      </div>
    )
  }
}

class AccountPage extends React.Component {
  render(){
    return (
      <div>
        <AccountFeed user={1}/>
        <Footer />
      </div>
    )
  }
}

class AddFriend extends React.Component{
  render(){
    return(
      <div>
        <AddFriendPage />
        <Footer />
      </div>
    )
  }
}

class App extends React.Component {
    render() {
      return (
        <div>

          <NavBar user={1} />

          {this.props.children}

          <ErrorBanner/>
        </div>
      );
    }
  }

  class ForumPage extends React.Component{
    render(){
      return(
        <div>
          <ForumItem user={1}/>
          <Footer />
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
        <Route path="/AddFriend" component={AddFriend} />
        <Route path="/SearchResult/:userId/:key" component={SearchResultPage}/>
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
