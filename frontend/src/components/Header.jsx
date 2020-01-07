import React from 'react';
import {
  Fullscreen, FullscreenExit, Feedback as FeedbackIcon,
  Help as HelpIcon, Person as UserIcon, Menu as MenuIcon
} from '@material-ui/icons';
import logo from '../images/logo.png'
import Instructable from '../containers/Instructable';
import LevelBar from '../components/LevelBar';
import {translate} from '../localization';
import {Menu, Avatar, IconButton, MenuItem, AppBar, Toolbar} from "@material-ui/core";

import {makeStyles, useTheme} from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  fontAwesomeIcon: {
    boxShadow: 'none',
    backgroundColor:'rgba(0,0,0,0)',
  },
  appBar: {
    backgroundColor: 'rgba(0,0,0,1)',
  }
}));

export default function Header(props) {

  const theme = useTheme();
  const classes = useStyles();

  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleFullscreen = () => isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  const showNewInstructions = props.showInstructions.bind(this, {onlyNew: true});
  const showAllInstructions = props.showInstructions.bind(this, {onlyNew: false});

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderTitle() {
    const logoImg = (
      <img
        key='header-logo'
        alt='RoboMission logo'
        src={logo}
        style={{
          height: '5rem',
          padding: 14,
          boxSizing: 'border-box',
        }}
      />
    );
    let modeTitleText = '';
    if (props.mode === 'monitoring') {
      modeTitleText = 'Monitoring';
    }
    const modeTitle = (
      <span
        key='header-mode-title'
        style={{position: 'absolute', top: 0, marginLeft: 15, color: 'white'}}
      >
        {modeTitleText}
      </span>
    );
    return [logoImg, modeTitle];
  }

    const {nNewInstructions} = props;
    let userIcon = (<UserIcon/>);
    if (!props.user.isLazy) {
      userIcon = props.user.initial;
    }
    const avatar = (
      <IconButton style={{padding: 0}} onClick={handleMenu}>
        <Avatar>
          {userIcon}
        </Avatar>
      </IconButton>
    );

    let userMenu = (
      <Instructable key="login" instruction="env-login">
        <div>
          {avatar}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={props.openLoginModal}
            >
              {translate('user.login')}</MenuItem>
            <MenuItem
              onClick={props.openSignUpModal}
            >
              {translate('user.signup')}</MenuItem>
            <MenuItem
              onClick={props.logout}
            >
              {translate('user.delete-history')}</MenuItem>
          </Menu>
        </div>
      </Instructable>
    );
    if (!props.user.isLazy) {
      userMenu = (
        <Menu iconButtonElement={avatar}>
          <MenuItem
            primaryText={translate('user.logout')}
            onClick={props.logout}
          />
        </Menu>
      );
    }
    return (
      <AppBar position="static" color='primary' className={classes.appBar}>
        <Toolbar >

          <IconButton edge="start" onClick={props.onMenuIconTouchTap}>
            <Instructable instruction="env-menu" position="bottom">
              <MenuIcon/>
            </Instructable>
          </IconButton>
          {renderTitle()}

          <div style={{flexGrow: 1}}/>
          {props.mode !== 'monitoring' && [(
            <Instructable key="levelbar" instruction="env-levelbar" position="bottom">
              <div
                key="levelbar"
                style={{marginRight: 10}}>
                <LevelBar mini {...props.levelInfo} />
              </div>
            </Instructable>
          )
          ]}
          <div key="user-toolbar">
            <Instructable key="fullscreen" instruction="env-fullscreen" position="bottom">

              <IconButton
                className={classes.fontAwesomeIcon}
                tooltip={isFullscreen ? translate('Exit fullscreen') : translate('Fullscreen')}
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                  return toggleFullscreen();
                }}
              >
                {isFullscreen ? <FullscreenExit color={theme.palette.secondary.main}/> : <Fullscreen color={theme.palette.secondary.main}/>}
              </IconButton>


            </Instructable>
            <Instructable key="help" instruction="env-help" position="bottom">
              <Menu
                iconButtonElement={
                  <IconButton tooltip={translate('Help')} className = {classes.fontAwesomeIcon}>
                    <HelpIcon color={(nNewInstructions > 0) ?
                      theme.palette.secondary.main : 'white'}/>
                  </IconButton>
                }
              >
                <MenuItem
                  primaryText={`${translate('New instructions')} (${nNewInstructions})`}
                  onClick={showNewInstructions}
                  disabled={nNewInstructions === 0}
                />
                <MenuItem
                  primaryText={translate('All instructions')}
                  onClick={showAllInstructions}
                />
              </Menu>
            </Instructable>
            <Instructable key="feedback" instruction="env-feedback" position="bottom">
              <IconButton
                tooltip={translate('Feedback')}
                onClick={props.openFeedbackModal}
                className={classes.fontAwesomeIcon}
              >
                <FeedbackIcon/>
              </IconButton>
            </Instructable>
          </div>
          <div>
            {userMenu}
          </div>
        </Toolbar>
      </AppBar>
    );

}
