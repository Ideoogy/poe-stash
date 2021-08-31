import React, { Component } from 'react';
import StashView from './StashView'
import Box from '@material-ui/core/Box';
import { accountService} from '@/_services';
import {Button} from 'reactstrap';

class Stash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      tradeLink: null,
      treeData: {
        id: 'root',
        name: 'Stash',
        count: 1,
		    containsurl: false,
        children: []
      }
    };
	  this._retrieveData(props.id);
  }
  
  _retrieveData = async (id) => {
    try {
	    const stashData = await accountService.getStash(Object.values(id)[0]);
      if (typeof stashData !== 'undefined' && stashData !== "") {
        this.setTreeData(stashData); 
      }	
    } catch (error) {
    // Error retrieving data
      console.log(Object.values(id)[0]);
      console.log('Error retrieving data');
    }
  };
  
  setTreeData = (data) => {
    this.setState(state => ({ treeData: data }));
  };
  
  setIndex = (index) => {
    this.setState(state => ({ selectedIndex: index, tradelink: null }));
	  let selectedNode = this.getSelectedNode(index);
    this.toggleUrlLink(selectedNode);
  };
  
  getSelectedNode = (index) => {
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
      this.setState(state => ({ tradeLink: node, selectedIndex: null}));
    }		
  }
  
  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  };
  
  render() {
      return (
          <div className="p-4">
              <div className="container">
                <h1>Placeholder for fetch username</h1>
                  <Box className="stash" my="2rem" pt = "1rem" pb="16rem" bgcolor="##f5f5f5" border={1} borderRadius={16}>
                    <StashView source = {this} data={this.state.treeData} setIndex = {this.setIndex}/>
                  </Box>
                  {this.state.tradeLink!=null && <Button color="success" onClick={() => {this.openInNewTab(this.state.tradeLink.url);}}> Trade Link</Button>}
              </div>
          </div>
      );
    }
}
export {Stash};