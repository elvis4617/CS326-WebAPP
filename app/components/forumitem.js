import React from 'react';
import ForumNumber from './forumnumber';
import NewThreadBox from './newthread';
import Post from './post';
export default class ForumItem extends React.Component{
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
                <Post/>
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
