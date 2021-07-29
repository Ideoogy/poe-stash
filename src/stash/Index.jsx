import React, { Component } from 'react';
import { accountService } from '@/_services';
import IndexForm from './IndexForm';
import UrlForm from './UrlForm';
import TreeView from '@material-ui/lab/TreeView';
import {Button} from 'reactstrap';
import StashView from './StashView'
import Box from '@material-ui/core/Box';

class Stash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      showUrlForm: false,
      showIndexForm: false,
      tradeLink: null,
      treeData: {
        id: 'root',
        name: 'Stash',
        count: 1,
		    containsurl: false,
        children: []
      }
    };
	  this._retrieveData();
  }
  
  _retrieveData = async () => {
    try {
	    const user = accountService.userValue;
	    const stashData = await accountService.getStash(user.id);
      if (typeof stashData !== 'undefined' && stashData !== "") {
        this.setTreeData(stashData); 
      }	
    } catch (error) {
    // Error retrieving data
      console.log('Error retrieving data');
    }
  };
  
  toggleIndexForm  = () => {
    if (this.state.showUrlForm == true){
      this.setState(state => ({ showUrlForm: false }));
    }  
      this.setState(state => ({ showIndexForm: !this.state.showIndexForm }));
  };
  
  toggleUrlForm  = () => {
    if (this.state.showIndexForm == true){
        this.setState(state => ({ showIndexForm: false }));
    }
      this.setState(state => ({ showUrlForm: !this.state.showUrlForm }));
  };

  setTreeData = (data) => {
    this.setState(state => ({ treeData: data }));
  };
  
  setIndex = (index) => {
    this.setState(state => ({ selectedIndex: index }));
	  this.setState(state => ({ showIndexForm: false, showUrlForm: false, tradeLink: null }));
	  let selectedNode = this.getSelectedNode(index);
	  this.toggleUrlLink(selectedNode);
  };
  
  getSelectedNode = (index) => {
    console.log(index)
    var keyArray = index.split('/');
	  let currentNode = this.state.treeData;
	  var i,j;
	  for (i=1; i< keyArray.length; i++){
      for (j=0; j< currentNode.children.length; j++){
		    if (currentNode.children[j].id == (currentNode.id+'/'+keyArray[i])) {
		      currentNode = currentNode.children[j];	  
		    }
      }
	  }
    return currentNode;
  };
  
  toggleUrlLink = (node) => {
    if (node.containsurl == true) {
      this.setState(state => ({ tradeLink: node.url, selectedIndex: null}));
    }		
  };
  
  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  };

  render() {
    const user = accountService.userValue;  
      return (
          <div className="p-4">
              <div className="container">
                  <h1>{user.userName}</h1>
                  <Box className="stash" my="2rem" pt = "1rem" pb="16rem" bgcolor="##f5f5f5" border={1} borderRadius={16}>
                    <StashView data={this.state.treeData} setIndex = {this.setIndex}/>
                  </Box>
                  {this.state.selectedIndex != null && <Button className="indexButton" onClick={this.toggleIndexForm}>Add Index</Button>}
                  {this.state.selectedIndex != null && <Button onClick={this.toggleUrlForm}>Add Item</Button>}
                  {this.state.showIndexForm && <IndexForm data={this.state.treeData} indexKey={this.state.selectedIndex} setTreeData={this.setTreeData}/>}
                  {this.state.showUrlForm && <UrlForm data={this.state.treeData} indexKey={this.state.selectedIndex} setTreeData={this.setTreeData}/>}
                  {this.state.tradeLink!=null && <Button color="success" onClick={() => {this.openInNewTab(this.state.tradeLink);}}> Trade Link</Button>}
              </div>
          </div>
      );
    }
}
export {Stash};