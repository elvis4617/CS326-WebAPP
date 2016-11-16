import React from 'react';
import ForumNumber from './forumnumber';
import {getPostDataById} from '../server';
import {unixTimeToString} from '../util';
import ThreadBody from './threadbody'

export default class ThreadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh() {
    getPostDataById(this.props.id, (postData) => {
    this.setState(postData);
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
              <h1>{this.state.contents.title}</h1>
            </div>
            <div className="modal-body">
            <table className = "table forum table-striped">
              <thead>
                <tr>
                  <th className = "cell-stat-2x text-left">Author</th>
                  <th >Reply</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src = "img/testProfilePic.jpg" alt/>
                      <a className = "name" href = "#"> {this.state.contents.author}</a>
                  </td>
                  <td>
                      <span>{unixTimeToString(this.state.contents.postDate)}</span>
                    <p>{this.state.contents.content}</p>
                  </td>
                </tr>
              </tbody>
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
