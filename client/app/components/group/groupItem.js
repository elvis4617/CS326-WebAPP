import React from 'react';
import GroupModal from './groupModal';

export default class GroupItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      userId: this.props.userId
    };
  }

  render(){
    return(
      <li>
        <a type="button" data-toggle="modal" data-target={"#group-modal"+this.state.data._id} href="#">{this.state.data.groupName}</a>
          <GroupModal groupID={this.state.data._id}
                     data={this.state.data}
                     userId={this.state.userId}>
          </GroupModal>
        <br/>
        {this.state.data.description}
      </li>
    )
  }
}
