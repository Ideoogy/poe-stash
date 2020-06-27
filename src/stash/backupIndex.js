import React, { Component } from 'react';
import TreeMenu from 'react-simple-tree-menu';
import { accountService } from '@/_services';
import IndexForm from './IndexForm';
import UrlForm from './UrlForm';
import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core/styles';
import { ListGroupItem, Input, ListGroup, Button} from 'reactstrap';
// import default minimal styling or your own styling
import 'react-simple-tree-menu/dist/main.css';
import StashView from './StashView'

const iconStyle = {
  verticalAlign: 'text-bottom',
};
const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? '-' : '+'}</span>;

const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;
  
const ListItem = ({
  level = 0,
  hasNodes,
  isOpen,
  label,
  searchTerm,
  openNodes,
  toggleNode,
  matchSearch,
  focused,
  ...props
}) => (
  <ListGroupItem
    {...props}
    style={{
      paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
      cursor: 'pointer',
      boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
      zIndex: focused ? 999 : 'unset',
      position: 'relative',
    }}
  >
    {hasNodes && (
      <div
        style={{ display: 'inline-block' }}
        onClick={e => {
          hasNodes && toggleNode && toggleNode();
          e.stopPropagation();
        }}
      >
        <ToggleIcon on={isOpen} />
      </div>
    )}
    {label}
  </ListGroupItem>
);

class Stash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
	  showUrlForm: false,
	  showIndexForm: false,
	  treeData: [{
        key: 'root',
        label: 'Stash',
        count: 1,
        nodes: []
      }]
    };
	this._retrieveData();
  }
  
  _retrieveData = async () => {
    try {
	  const user = accountService.userValue;
	  const stashData = await accountService.getStash(user.id);
      if (typeof stashData !== 'undefined') {
        this.setTreeData(stashData); 
      }	
    } catch (error) {
    // Error retrieving data
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
    this  
    this.setState(state => ({ showUrlForm: !this.state.showUrlForm }));
  };

  setTreeData = (data) => {
    this.setState(state => ({ treeData: data }));
  };
 
  setIndex = (index) => {
    this.setState(state => ({ selectedIndex: index }));
  };
  
  //rerenderParentCallback() {
    //this.forceUpdate();
  //}
  
  render() {
	const user = accountService.userValue;  
    return (
        <div className="p-4">
            <div className="container">
                <h1>{user.firstName}</h1>
				<StashView/>
				<TreeMenu
                  data={this.state.treeData}
                  onClickItem={this.setIndex}
                  debounceTime={125}>
                  {({ search, items }) => (
                      <>
                        <Input onChange={e => search(e.target.value)} placeholder="Type and search" />
                        <ListGroup>
                          {items.map(props => (
                          // You might need to wrap the third-party component to consume the props
                          // check the story as an example
                          // https://github.com/iannbing/react-simple-tree-menu/blob/master/stories/index.stories.js
                            <ListItem {...props} />
                          ))}
                        </ListGroup>
                      </>
                  )}
                </TreeMenu>
				<Button onClick={this.toggleIndexForm}>Add Index</Button>
				<Button onClick={this.toggleUrlForm}>Add Item</Button>
				{this.state.showIndexForm && <IndexForm data={this.state.treeData} indexKey={this.state.selectedIndex} setTreeData={this.setTreeData}/>}
				{this.state.showUrlForm && <UrlForm data={this.state.treeData} indexKey={this.state.selectedIndex} setTreeData={this.setTreeData}/>}
            </div>
        </div>
    );
  }
}
export {Stash};