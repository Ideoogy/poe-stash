import React, { Component } from 'react';
import { accountService } from '@/_services';
const user = accountService.userValue;

class ItemForm extends React.Component {
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
      let currentNode = this.props.data[0];
      var i,j;
      for (i=1; i< keyArray.length; i++){
        for (j=0; j< currentNode.nodes.length; j++){
          if (currentNode.nodes[j].key == keyArray[i]) {
            currentNode = currentNode.nodes[j];	  
          }
        }  
      }
      currentNode.nodes.push({key: this.props.data[0].count, label: this.state.value, nodes: []});
      this.props.data[0].count +=1;
      accountService.updateStash(user.id, this.props.data);
      this.props.setTreeData(this.props.data);
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ItemForm;