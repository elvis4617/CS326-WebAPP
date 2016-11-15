import React from 'react';
import ForumNumber from './forumnumber';
import NewThreadBox from './newthread';
import Post from './post';
import {getForumData2} from '../server';
export default class ForumItem extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      contents: []
    };
  }

   componentDidMount(){
     getForumData2(this.props.user, (forumData) => {
       //this.setState({contents:forumData});
       this.setState(forumData);
     });
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
            <ForumNumber/>
            <table className = "table forum table-striped">
              <thead>
                <tr>
                  <th colSpan = "2" className = "cell-stat text-left">Thread</th>
                  <th className = "cell-stat text-center">Author/Date</th>
                  <th className = "cell-stat text-center">Reply/View</th>
                  <th className = "cell-stat text-center">Last Replied</th>
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
            <ForumNumber/>
            <hr id = "bottom" />
            <NewThreadBox/>
            </div>
          </div>
        </div>
  );
  }
}
