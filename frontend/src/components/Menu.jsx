import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import {ListItemText} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Subheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import TaskIcon from '@material-ui/icons/PlayArrow';
import TasksOverviewIcon from '@material-ui/icons/ViewComfy';
import TaskEditorIcon from '@material-ui/icons/NoteAdd';
import FeedbackIcon from '@material-ui/icons/Feedback';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import DBIcon from '@material-ui/icons/Storage';
import Link from '@material-ui/core/Link';
import GHIcon from '../components/GitHubIcon';
//import Text from '../localization/Text';
//import logoMenuPath from '../images/logo-menu.png';
import Image from'../components/Image';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {translate} from "../localization";
//import {makeStyles, useTheme} from '@material-ui/styles';

export default function Menu(props) {
  let openFeedbackModal = props.openFeedbackModal.bind(this);

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  function renderAdminMenu() {
    if (!props.user.isStaff) {
      return null;
    }
    return [
      (<Divider key="divivider-admin" />),
      (<Subheader key="subheader-admin" >Admin</Subheader>),
      (
        <ListItem button
          value="admin"
          key="admin"
          leftIcon={<DBIcon />}
          href="/admin/"
          target="_blank"
          rel="noreferrer noopener"
        >
          DB Admin
        </ListItem>
      ), (
        <ListItem button
          value="monitoring"
          key="monitoring"
          leftIcon={<EyeIcon />}
          containerElement={<Link to="/monitoring" />}
        >
          Monitoring
        </ListItem>
      ), (
        <ListItem button
          value="github"
          key="github"
          leftIcon={<GHIcon />}
          href="https://github.com/adaptive-learning/robomission"
          target="_blank"
          rel="noreferrer noopener"
        >
          Repo
        </ListItem>
      ),
    ];
  }

  let practiceTaskUrl = '';
  if (props.recommendedTask !== null) {
    practiceTaskUrl = props.recommendedTask.url;
  }
  return (
    <Drawer
      open={props.open}
      onClose={handleDrawerClose}
    >
      <Image imageId="menu-banner" style={{ width: "100%", marginBottom: -12 }} aria-controls="simple-menu" aria-haspopup="true"/>
      <List>
      { /* Note that disabling auto focus on menu is important to avoid
      material-ui bug of menu steeling focus to text fields when typing, see
      https://github.com/callemall/material-ui/issues/4387 */ }
        <Divider style={{ marginTop: 0 }} />
        <Link href="/">
          <ListItem button key="intro">
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary= {translate("Intro")}/>
          </ListItem>
        </Link>
        {practiceTaskUrl &&
        <Link href={practiceTaskUrl}>
          <ListItem button key="task">
            <ListItemIcon>
              <TaskIcon/>
            </ListItemIcon>
            <ListItemText primary={translate("Practice")}/>
          </ListItem>
        </Link>}
        <Link to="/tasks">
          <ListItem button key="tasks">
            <ListItemIcon>
              <TasksOverviewIcon/>
            </ListItemIcon>
            <ListItemText primary={translate("Tasks")}/>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/task-editor">
          <ListItem button key="task-editor">
            <ListItemIcon>
              <TaskEditorIcon/>
            </ListItemIcon>
            <ListItemText primary={translate("Task Editor")}/>
          </ListItem>
        </Link>
        <ListItem button key="feedback" onClick={openFeedbackModal}>
          <ListItemIcon>
            <FeedbackIcon/>
          </ListItemIcon>
          <ListItemText primary={translate("Feedback")}/>
        </ListItem>
        {renderAdminMenu()}
      </List>
    </Drawer>
  );
}

