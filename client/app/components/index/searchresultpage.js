import React from 'react';
import GroupItem from '../group/groupItem';
import { Link} from 'react-router';
import {getMatchGroup} from '../../server';


export default class SearchResultPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      key: this.props.params.key,
      userId: this.props.params.userId
    };
  }

  refresh() {
    getMatchGroup(this.props.params.key, (matchGroupList) => {
    this.setState({contents: matchGroupList.contents, key: this.props.params.key});
  });
 }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    if(this.props.params.key != this.state.key){
      this.refresh();
    }
  }

  render(){
    return(
      <div>
        <div className = "container">
          <div className = "row">
            <div className = "col-md-7 col-md-offset-3">
              <div className="page-header">
                <h1>Search Results </h1>
                <h5>{this.state.contents.length} results found for {this.state.key}</h5>
              </div>
              <div className="row">
                <ul className="results">
                  {this.state.contents.map((groupItem) => {
                      return(
                        <GroupItem key={groupItem._id}
                                    data={groupItem}
                                    userId={this.state.userId}/>
                      )
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="list-inline">
                            <li>
                                <Link to="/Index">
                                  <span className = "footer-nav" href="#">Home</span>
                                </Link>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <span className = "footer-nav" href="#about">About</span>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <span className = "footer-nav" href="#services">Services</span>
                            </li>
                            <li className="footer-menu-divider">&sdot;</li>
                            <li>
                                <span className = "footer-nav" href="#contact">Contact</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    )
  }
}
