import React, { Component } from 'react';
import { accountService } from '@/_services';
import './UrlForm.css';

class UrlForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
	  label: '',
	  url: ''
	};

    this.handleLabelChange = this.handleLabelChange.bind(this);
	this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLabelChange(event) {
    this.setState({label: event.target.value});
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
	var keyArray = this.props.indexKey.split('/');
	if (keyArray.length>0) {
	  let currentNode = this.props.data;
	  var i,j;
	  for (i=1; i< keyArray.length; i++){
            for (j=0; j< currentNode.children.length; j++){
	       if (currentNode.children[j].id == (currentNode.id+'/'+keyArray[i])) {
	          currentNode = currentNode.children[j];
	       }
	    }
          }
	  currentNode.children.push({id: (currentNode.id+'/'+this.props.data.count.toString()), name: this.state.label, containsurl: true, url: this.state.url, children: []});
	  this.props.data.count +=1;
	  const user = accountService.userValue;
	  accountService.updateStash(user.id, this.props.data);
	  this.props.setTreeData(this.props.data);
	}
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            <div className ="container-form">
              <p><label className = "field">Label:</label>
              <input className = "inputbox" type="text" value={this.state.label} onChange={this.handleLabelChange} />
              </p>
            </div>
            <div className ="container-form">
              <p><label className = "field">Url:</label>
              <input className = "inputbox" type="text" value={this.state.url} onChange={this.handleUrlChange} />
              </p>
              <input type="submit" value="Submit"/>
            </div>
          </legend>
        </fieldset>
      </form>
    );
  }
}

export default UrlForm;
