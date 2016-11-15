import React from 'react';

export default class MailEntry extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      value:""
    };
  }

   handlePost(e){
     //Prevent the event from 'bubbling' up the DOM tree.
     e.preventDefault();
     //Trim whitespace from beginning + end of entry.
     var statusUpdateText = this.state.value.trim();
     if (statusUpdateText !==""){
       this.props.onSend(statusUpdateText);
       // Reset status update.
       this.setState({value:""});
     }
   }

   /**
    * Called when the user types a character into the status update box.
    * @param e An Event object.
    */
   handleChange(e){
     e.preventDefault();
     this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="fb-status-update-entry panel panel-default">
        <div className="panel-body">
          <div className="media">
            <div className="media-left media-top">
              PIC
            </div>
            <div className="media-body">
              <div className="form-group">
                <textarea className="form-control"
                          rows="2"
                          placeholder="What's on your mind?"
                          value ={this.state.value}
                          onChange = {(e) => this.handleChange(e)}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
              <div className="pull-right">
                <button type="button" className="btn btn-default">
                  <span className="glyphicon glyphicon-user"></span>
                    Friends <span className="caret"></span>
                </button>
                <button type="button"
                        className="btn btn-default"
                        onClick={(e) => this.handlePost(e)}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
