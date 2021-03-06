import React from 'react';
import {
  Fullscreen, FullscreenExit, FeedbackOutlined as FeedbackIcon,
  HelpOutline as HelpIcon, PersonOutlined as UserIcon, MenuOutlined as MenuIcon
} from '@material-ui/icons';
import logo from '../images/logo.png'
import Instructable from '../containers/Instructable';
import LevelBar from '../components/LevelBar';
import {translate} from '../localization';
import {Menu, Avatar, IconButton, MenuItem, AppBar, Toolbar, Tooltip} from "@material-ui/core";

import {makeStyles} from '@material-ui/styles';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
    "@keyframes pulseAnimation": {
        "0%": {transform: "scale(1)"},
        "50%": {transform: "scale(1.5)"},
        "100%": {transform: "scale(1)"},
    },
  fontAwesomeIcon: {
    boxShadow: 'none',
    backgroundColor:'rgba(0,0,0,0)',
  },
    pulse: {
        animation: "1s $pulseAnimation linear 1s 2"
    },
  logo: {
    [theme.breakpoints.down('xs')]:{
      display: "none"
    }
  }
}));

export default function Header(props) {

  const classes = useStyles();

  const [isFullscreen, setIsFullscreen] = React.useState(document.fullscreenElement !== null);
  const [anchorElForUserMenu, setAnchorElForUserMenu] = React.useState(null);
  const [anchorElForHelp, setAnchorElForHelp] = React.useState(null);

  const toggleFullscreen = () => isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  const showNewInstructions = props.showInstructions.bind(this, {onlyNew: true});
  const showAllInstructions = props.showInstructions.bind(this, {onlyNew: false});

  function renderTitle() {
    let logoImg = (
      <img
        key='header-logo'
        alt='RoboMission logo'
        className={classes.logo}
        src={logo}
        style={{
          height: '3rem'
        }}
      />
    );
    logoImg =
        <Box style={{overflow: "hidden"}} key="logoImg">

          <Link href="/" aria-label={translate('Intro')}>
            {logoImg}
          </Link>
        </Box>
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
      <IconButton aria-label="User Menu" onClick={({currentTarget}) => setAnchorElForUserMenu(currentTarget)}>
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
            anchorEl={anchorElForUserMenu}
            keepMounted
            open={Boolean(anchorElForUserMenu)}
            onClose={() => setAnchorElForUserMenu(null)}
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
          <div>
            {avatar}
            <Menu
                id="user-menu"
                anchorEl={anchorElForUserMenu}
                keepMounted
                open={Boolean(anchorElForUserMenu)}
                onClose={() => setAnchorElForUserMenu(null)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
            >
              <MenuItem onClick={props.logout}>
                {translate('user.logout')}
              </MenuItem>
            </Menu>
          </div>
      );
    }
    return (
      <AppBar position="static" color='transparent' elevation={0} className={classes.appBar}>
        <Toolbar >
          <IconButton edge="start" aria-label="menu" onClick={props.onMenuIconTouchTap}>
            <Instructable instruction="env-menu" position="bottom">
              <MenuIcon/>
            </Instructable>
          </IconButton>
          {renderTitle()}

          <div style={{flexGrow: 1}}/>
          {props.mode !== 'monitoring' && [(
            <Instructable key="levelbar" instruction="env-levelbar" position="bottom">
              <div
                key="levelbar">
                <LevelBar mini {...props.levelInfo} />
              </div>
            </Instructable>
          )
          ]}
          <div key="user-toolbar"  style={{display: "flex"}}>
            <Instructable key="fullscreen" instruction="env-fullscreen" position="bottom">
              <Tooltip title={isFullscreen ? translate('Exit fullscreen') : translate('Fullscreen')}>
                <IconButton
                    aria-label={isFullscreen ? translate('Exit fullscreen') : translate('Fullscreen')}
                    className={classes.fontAwesomeIcon}
                    onClick={() => {
                      setIsFullscreen(!isFullscreen);
                      return toggleFullscreen();
                    }}
                >
                  {isFullscreen ? <FullscreenExit/> : <Fullscreen/>}
                </IconButton>
              </Tooltip>



            </Instructable>
            <Instructable key="help" instruction="env-help" position="bottom">
              <div>
                <Tooltip title={translate('Help')}>
                  <IconButton aria-label={translate('Help')} onClick={({currentTarget}) => setAnchorElForHelp(currentTarget)} className = {classes.fontAwesomeIcon}>
                      {(nNewInstructions > 0) ?
                          <HelpIcon className={classes.pulse} color='secondary'/> :
                          <HelpIcon color='inherit'/>
                      }

                  </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorElForHelp}
                    keepMounted
                    open={Boolean(anchorElForHelp)}
                    onClose={() => setAnchorElForHelp(null)}
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
                      onClick={() => {showNewInstructions();setAnchorElForHelp(null)}}
                      disabled={nNewInstructions === 0}
                      aria-disabled={nNewInstructions === 0}
                  >
                    {`${translate('New instructions')} (${nNewInstructions})`}
                  </MenuItem>
                  <MenuItem onClick={() => {showAllInstructions();setAnchorElForHelp(null)}}>
                    {translate('All instructions')}
                  </MenuItem>
                </Menu>
              </div>
            </Instructable>
            <Instructable key="feedback" instruction="env-feedback" position="bottom">
              <Tooltip title={translate('Feedback')}>
                <IconButton
                    aria-label={translate('Feedback')}
                    onClick={props.openFeedbackModal}
                    className={classes.fontAwesomeIcon}
                >
                  <FeedbackIcon/>
                </IconButton>
              </Tooltip>

            </Instructable>
          </div>
          <div>
            {userMenu}
          </div>
        </Toolbar>
      </AppBar>
    );

}
