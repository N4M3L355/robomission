import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';
import UserIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from '@material-ui/core/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';
import logo from '../images/logo.png'
import Instructable from '../containers/Instructable';
import LevelBar from '../components/LevelBar';
import { translate } from '../localization';


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
          height: '100%',
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
      <Instructable key="login" instruction="env-login" position="bottom">
        <IconMenu
          iconButtonElement={avatar}>
            <MenuItem
              primaryText={translate('user.login')}
              onClick={this.props.openLoginModal}
            />
            <MenuItem
              primaryText={translate('user.signup')}
              onClick={this.props.openSignUpModal}
            />
            <MenuItem
              primaryText={translate('user.delete-history')}
              onClick={this.props.logout}
            />
        </IconMenu>
      </Instructable>
    );
    if (!this.props.user.isLazy) {
      userMenu = (
        <IconMenu iconButtonElement={avatar}>
          <MenuItem
            primaryText={translate('user.logout')}
            onClick={this.props.logout}
          />
        </IconMenu>
      );
    }
    const toolbar = (
      <Toolbar style={{ backgroundColor: 'transparent', color: 'white' }}>
        {this.props.mode !== 'monitoring' && [(
          <Instructable key="levelbar" instruction="env-levelbar" position="bottom">
            <ToolbarGroup
              key="levelbar"
              style={{ marginRight: 10 }}>
                <LevelBar mini {...this.props.levelInfo} />
            </ToolbarGroup>
          </Instructable>
        )
        ]}
        <ToolbarGroup key="user-toolbar" lastChild={true}>
          <Instructable key="fullscreen" instruction="env-fullscreen" position="bottom">

            {<IconButton
              tooltip={this.state.isInFullscreen ? translate('Exit fullscreen') : translate('Fullscreen') }
              onClick={() => {
                this.toggleFullscreen();
                this.setState(prevState => ({isInFullscreen: !prevState.isInFullscreen}))
              }}
            >
              {this.state.isInFullscreen ? <FullscreenExit color='white'/> : <Fullscreen color='white'/>}
            </IconButton>}


          </Instructable>
          <Instructable key="help" instruction="env-help" position="bottom">
            <IconMenu
              iconButtonElement={
                <IconButton tooltip={translate('Help')} >
                  <HelpIcon color={ (nNewInstructions > 0) ?
                    this.props.muiTheme.palette.accent1Color : 'white' } />
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
            </IconMenu>



          </Instructable>
          <Instructable key="feedback" instruction="env-feedback" position="bottom">
            <IconButton
              tooltip={translate('Feedback')}
              onClick={this.props.openFeedbackModal}
            >
              <FeedbackIcon />
            </IconButton>
          </Instructable>
          {userMenu}
        </ToolbarGroup>
      </Toolbar>
    );
    return (
      <AppBar
        title={this.renderTitle()}
        style={{
          backgroundColor: this.props.muiTheme.palette.primary1Color,
          margin: 0,
        }}
        iconElementLeft={
          <IconButton>
            <Instructable instruction="env-menu" position="bottom">
              <MenuIcon />
            </Instructable>
          </IconButton>}
        onLeftIconButtonTouchTap={this.props.onMenuIconTouchTap}
        iconElementRight={toolbar}
      />
    );
  }
}

Header = muiThemeable()(Header);

export default Header;
