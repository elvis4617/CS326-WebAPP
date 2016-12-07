import React from 'react';
import GroupItem from '../group/groupItem';
import {getMatchGroup} from '../../server';


export default class SearchResult extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      key: this.props.keys,
      userId: this.props.userId
    };
  }

  refresh() {
    getMatchGroup(this.props.keys, (matchGroupList) => {
    this.setState({contents: matchGroupList.contents, key: this.props.keys});
  });
 }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    if(this.props.keys != this.state.key){
      this.refresh();
    }
  }

  render(){
    return(
      <div>
        <div className = "container content">
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
      </div>
    )
  }
}
