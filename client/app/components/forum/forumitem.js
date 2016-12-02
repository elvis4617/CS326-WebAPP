import React from 'react';
import ForumNumber from './forumnumber';
import NewThreadBox from './newthread';
import Post from './post';
import {getForumData, postThread} from '../../server';

export default class ForumItem extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      contents: []
    };
  }

  refresh(){
    getForumData(this.props.user, (forumData) => {
      //this.setState({contents:forumData});
      this.setState(forumData);
    });
  }

  onPost(threadTitle, threadContent){
    postThread(this.props.user, threadTitle, threadContent, ()=>{
      this.refresh();
    });
  }

   componentDidMount(){
     this.refresh();
  }

  render(){
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12">
            <div className = "page-header page-heading">
              <h1> ToGather Forum </h1>
            </div>
            <p className = "lead"> Post any new threads to look for a study group or partner, please write the course number in bracket and the any title you wish to write.</p>
            <hr />
            <table className = "table forum table-striped">
              <thead>
                <tr>
                  <th colSpan = "2" className = "cell-stat text-left">Thread</th>
                  <th className = "cell-stat text-center">Author/Date</th>
                  <th className = "cell-stat text-center">Reply/View</th>
                  <th className = "cell-stat text-center">Last Message</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contents.map((postItem) => {
                  return (
                    <Post key={postItem._id} data={postItem} />
                  );
                })}
              </tbody>
            </table>
            <hr id = "bottom" />
            <NewThreadBox
              onPost={(threadTitle, threadContent)=> this.onPost(threadTitle, threadContent)}/>
            </div>
          </div>
        </div>
  );
  }
}
