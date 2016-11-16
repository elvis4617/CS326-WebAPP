import React from 'react';
import {getForumData} from '../server';
import ThreadBody from './threadbody';
import ForumNumber from './forumnumber';
import {getRecommendPostItem} from '../server';

export default class ThreadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getRecommendPostItem(this.props.author, (forumData) => {
    this.setState(forumData);
  });
 }

  componentDidMount() {
    this.refresh();
  }

  render(){
    return(
      <div className="modal fade" id={"thread-modal"+this.props.id} role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h1>test</h1>
            </div>
            <div className="modal-body">
            <table className = "table forum table-striped">
              <thead>
                <tr>
                  <th className = "cell-stat-2x text-left">Author</th>
                  <th >Reply</th>
                </tr>
              </thead>
              <ThreadBody/>
            </table>
            </div>
            <div className="modal-footer">
              <ForumNumber/>
            </div>
            </div>
          </div>
      </div>
    )
  }
}
