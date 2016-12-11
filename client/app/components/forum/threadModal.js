import React from 'react';
import {getPostDataById, postReply} from '../../server';
import {unixTimeToString} from '../../util';
import ThreadBody from './threadbody'
import NewCommentBox from './newcomment'
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

  onPost(replyContent){
    postReply(this.props.user, replyContent, this.props.id, ()=>{
      this.refresh();
    });
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
              {
              this.props.commentThread.map((comment, i) => {
                // i is comment's index in comments array
                return (
                  <ThreadBody key={i}
                    author={comment.author}
                    postDate={comment.postDate}>
                    {comment.content}
                  </ThreadBody>
                );
              })
            }
            </table>
            </div>
            <div className="modal-footer">
              <NewCommentBox onPost={(replyContent)=> this.onPost(replyContent)}/>
            </div>
            </div>
          </div>
      </div>
    )
  }
}
