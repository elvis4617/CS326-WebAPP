import React from 'react';
import Recommend_Left from './recommend_left';
import Recommend_Right from './recommend_right';
import {getRecommendPostItem, getRecommendPostItemFriend} from '../server'

export default class Recommend extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getRecommendPostItem(this.props.user, (maxList) => {
    this.setState(maxList);
  });
 }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(
      <div>
        {this.state.contents.map((recommendItem) => {
            if(recommendItem._id % 2 == 1)
              return (
                <Recommend_Left key={recommendItem._id} data={recommendItem} />
              )
            else
              return (
                <Recommend_Right key={recommendItem._id} data={recommendItem} />
              )
          }
        )}
      </div>
    )
  }
}
