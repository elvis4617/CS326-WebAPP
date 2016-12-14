import React from 'react';
import {getPostDataById, postReply, getForumItem} from '../../server';
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
    getForumItem(this.props.id, (postData) => {
    // this.setState(postData);
    this.setState({contents:postData})
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
    var map;
    if (this.state.contents.commentThread !== undefined){
      map = this.state.contents.commentThread.map((comment, i) => {
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

    return(
      <div className="modal fade" id={"thread-modal"+this.props.id} role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h1>{this.props.title}</h1>
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
                      <a className = "name" href = "#"> {this.props.author}</a>
                  </td>
                  <td>
                      <span>{unixTimeToString(this.props.postDate)}</span>
                    <p>{this.state.contents.content}</p>
                  </td>
                </tr>
              </tbody>
              {
              map
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
