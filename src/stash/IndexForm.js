import React, { Component } from 'react';
import { accountService } from '@/_services';
import './UrlForm.css';

class IndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
      currentNode.children.push({id: (currentNode.id+'/'+this.props.data.count.toString()), name: this.state.value, containsurl: false, children: []});
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
            <p><label className = "field">Name:</label>
            <input className = "inputbox" type="text" value={this.state.value} onChange={this.handleChange} />
            </p>
            <p>
            <input className = "submit" type="submit" value="Submit"/>
            </p>
          </legend>
        </fieldset>
      </form>
    );
  }
}

export default IndexForm;