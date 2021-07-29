import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from "@material-ui/core/Typography";
import Label from "@material-ui/icons/Label";
import SvgIcon from '@material-ui/core/SvgIcon';

import { accountService } from '@/_services';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function StashView(props) {
  
 function CurrencyIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M9 6L7 9c0 2 3 4 6 4 2 0 3 3 0 4-2 1-2 1-3-1l-3-1 5 5 5-5c0-2-3-4-6-4-2 0-3-3 0-4 2-1 2-1 3 1h3l-5-4-3 2z" />
      </SvgIcon>
    );
  }

  function WeaponIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M14 9c-6 6-9 8-11 7l-1 2v3l-1 2 2-1h3c2 0 2 0 2-2-1-1 0-2 2-4L24 0 14 9z"/>
      </SvgIcon>
    );
  }

  function ArmorIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M7 3c-4 1-4 1-4 7 0 5 0 6 4 9l5 4 5-4c4-3 4-4 4-9V4l-4-1c-5-2-5-2-10 0zm10 2c2 0 2 1 2 5 0 3-1 5-3 8l-4 4-3-4c-3-3-4-5-4-8 0-4 0-5 3-6h5l4 1z"/>
      </SvgIcon>
    );
  }

  function AccessoryIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M8 3v4c0 2 8 2 8 0V3c-2-2-8-1-8 0zm2 3C9 7 9 6 9 5s0-2 1-1v2zm3-1l-1 2-1-2 1-2 1 2zm2 1c-1 1-1 0-1-1s0-2 1-1v2zM5 12c-1 2 0 5 2 8 3 3 6 3 9 0 2-2 3-3 3-5 0-5-1-6-7-6-5 0-6 1-7 3zm2 1c0 6 5 9 9 5l1-5v-1 5c-2 6-11 4-11-2 0-3 1-5 2-5l-1 3zm8-2c3 4-1 9-5 7-3-2-2-8 2-8l3 1z"/>
      </SvgIcon>
    );
  }

  function selectIcon(i){
    switch(i) {
      case 0:
        return Label
      case 1:
       return WeaponIcon
      case 2:
       return ArmorIcon
      case 3:
       return AccessoryIcon
      case 4:
       return CurrencyIcon
    }
  }

  const useTreeItemStyles = makeStyles(theme => ({
    root: {
      color: theme.palette.text.secondary,
      "&:focus > $content": {
        backgroundColor: `white)`,
        color: "cyan"
      }
    },
    content: {
      color: "white",
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular
      }
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2)
      }
    },
    expanded: {},
    label: {
      fontWeight: "inherit",
      color: "inherit"
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0)
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1
    }
  }));
  
  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {
      labelText,
      labelIcon: LabelIcon,
      labelInfo,
      color,
      bgColor,
      ...other
    } = props;
  
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          group: classes.group,
          label: classes.label
        }}
        {...other}
      />
    );
  }

  const classes = useStyles();

  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} labelText={nodes.name} labelIcon={selectIcon(nodes.icon ? nodes.icon: 0)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );
  
  const testSelect = (value) => {
    props.setIndex(value);
  };
  
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
	    onNodeSelect = {testSelect}
    >
      {renderTree(props.data)}
    </TreeView>
  );
}