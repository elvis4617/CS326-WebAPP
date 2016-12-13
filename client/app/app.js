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
import SearchResult from './components/index/searchresult';
import ErrorBanner from './components/utility/errorBanner';
import About from './components/index/about';
import Contact from './components/index/contact';
import Faq from './components/index/faq';

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

class AboutPage extends React.Component {
  render(){
    return(
      <div>
        <About />
        <Footer />
      </div>
    )
  }
}

class ContactPage extends React.Component {
  render(){
    return(
      <div>
        <Contact />
        <Footer />
      </div>
    )
  }
}

class FaqPage extends React.Component {
  render(){
    return(
      <div>
        <Faq />
        <Footer />
      </div>
    )
  }
}

class SearchResultPage extends React.Component {
  render(){
    return(
      <div>
        <SearchResult keys={this.props.params.key} userId={this.props.params.userId}/>
        <Footer />
      </div>
    )
  }
}

class NotificationPage extends React.Component {
  render() {
    return (
      <div>
        <MailBoxThread user={"000000000000000000000001"} />
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
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ErrorBanner />
                </div>
              </div>
            </div>
            {this.props.children}
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
        <Route path="/About" component={AboutPage}/>
        <Route path="/Faq" component={FaqPage}/>
        <Route path="/Contact" component={ContactPage}/>
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
