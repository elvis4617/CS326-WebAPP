import React from 'react';
import GroupModal from './groupModal';

export default class GroupItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render(){
    return(
      <li>
        <a type="button" data-toggle="modal" data-target={"#group-modal"+this.state._id} href="#">{this.state.groupName}</a>
          <GroupModal groupID={this.state._id}
                     data={this.state}>
          </GroupModal>
        <br/>
        {this.state.description}
      </li>
    )
  }
}
