import React from 'react';
import {Fullscreen, FullscreenExit, Feedback as FeedbackIcon,
  Help as HelpIcon, Person as UserIcon, Menu as MenuIcon} from '@material-ui/icons';
import logo from '../images/logo.png'
import Instructable from '../containers/Instructable';
import LevelBar from '../components/LevelBar';
import { translate } from '../localization';
import {Menu, Avatar, IconButton, MenuItem, AppBar, Toolbar} from "@material-ui/core";
 import {withStyles} from "@material-ui/styles";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isInFullscreen: false
    };

    this.toggleFullscreen = () => {
      if (this.state.isInFullscreen) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    };
    this.showNewInstructions = props.showInstructions.bind(this, { onlyNew: true });
    this.showAllInstructions = props.showInstructions.bind(this, { onlyNew: false });
  }

  renderTitle() {
    const logoImg = (
      <img
        key='header-logo'
        alt='RoboMission logo'
        src={ logo }
        style={{
          height: '5rem',
          padding: 14,
          boxSizing: 'border-box',
        }}
      />
    );
    let modeTitleText = '';
    if (this.props.mode === 'monitoring') {
      modeTitleText = 'Monitoring';
    }
    const modeTitle = (
      <span
        key='header-mode-title'
        style={{ position: 'absolute', top: 0, marginLeft: 15, color: 'white' }}
      >
        {modeTitleText}
      </span>
    );
    return [logoImg, modeTitle];
  }

  render() {
    const { nNewInstructions } = this.props;
    let userIcon = (<UserIcon />);
    if (!this.props.user.isLazy) {
      userIcon = this.props.user.initial;
    }
    const avatar = (
      <IconButton style={{padding: 0}}>
        <Avatar>
          {userIcon}
        </Avatar>
      </IconButton>
    );

    let userMenu = (
      <Instructable key="login" instruction="env-login">
        <div>
        {avatar}
        <Menu id="user-menu">
          <MenuItem
            onClick={this.props.openLoginModal}
          >
            {translate('user.login')}</MenuItem>
          <MenuItem
            onClick={this.props.openSignUpModal}
          >
            {translate('user.signup')}</MenuItem>
          <MenuItem
            onClick={this.props.logout}
          >
            {translate('user.delete-history')}</MenuItem>
        </Menu>
        </div>
      </Instructable>
    );
    if (!this.props.user.isLazy) {
      userMenu = (
        <Menu iconButtonElement={avatar}>
          <MenuItem
            primaryText={translate('user.logout')}
            onClick={this.props.logout}
          />
        </Menu>
      );
    }
    return (
      <AppBar position="static">
        <Toolbar>

          <IconButton  edge="start" onClick={this.props.onMenuIconTouchTap}>
            <Instructable instruction="env-menu" position="bottom">
              <MenuIcon />
            </Instructable>
          </IconButton>
          {this.renderTitle()}

          <div style={{flexGrow: 1}}/>
          {this.props.mode !== 'monitoring' && [(
            <Instructable key="levelbar" instruction="env-levelbar" position="bottom">
              <div
                key="levelbar"
                style={{ marginRight: 10 }}>
                <LevelBar mini {...this.props.levelInfo} />
              </div>
            </Instructable>
          )
          ]}
          <div key="user-toolbar">
            <Instructable key="fullscreen" instruction="env-fullscreen" position="bottom">

              <IconButton
                tooltip={this.state.isInFullscreen ? translate('Exit fullscreen') : translate('Fullscreen') }
                onClick={() => {
                  this.toggleFullscreen();
                  this.setState(prevState => ({isInFullscreen: !prevState.isInFullscreen}))
                }}
              >
                {this.state.isInFullscreen ? <FullscreenExit color='white'/> : <Fullscreen color='white'/>}
              </IconButton>


            </Instructable>
            <Instructable key="help" instruction="env-help" position="bottom">
              <Menu
                iconButtonElement={
                  <IconButton tooltip={translate('Help')} >
                    <HelpIcon color={ (nNewInstructions > 0) ?
                      'yellow' : 'white' } />
                  </IconButton>
                }
              >
                <MenuItem
                  primaryText={`${translate('New instructions')} (${nNewInstructions})`}
                  onClick={this.showNewInstructions}
                  disabled={nNewInstructions === 0}
                />
                <MenuItem
                  primaryText={translate('All instructions')}
                  onClick={this.showAllInstructions}
                />
              </Menu>
            </Instructable>
            <Instructable key="feedback" instruction="env-feedback" position="bottom">
              <IconButton
                tooltip={translate('Feedback')}
                onClick={this.props.openFeedbackModal}
              >
                <FeedbackIcon />
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
}

Header = withStyles({})(Header);

export default Header;
