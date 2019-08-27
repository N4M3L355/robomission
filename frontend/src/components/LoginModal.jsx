import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {GridList, GridListTile as GridTile} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { translate } from '../localization';


export default class LoginModal extends React.Component {
  render() {
    const changeEmail = (event) => {
      const credentials = {...this.props.credentials, email: event.target.value};
      this.props.changeCredentials(credentials);
    }
    const changePassword = (event) => {
      const credentials = {...this.props.credentials, password: event.target.value};
      this.props.changeCredentials(credentials);
    }
    const login = () => {
      this.props.login({ credentials: this.props.credentials });
    };
    const loginViaFacebook = () => {
      this.props.login({ provider: 'facebook' });
    };
    const loginViaGoogle = () => {
      this.props.login({ provider: 'google' });
    };
    const buttonStyle = {
      boxShadow: 'none',
      margin: 0,
      marginBottom: 10,
      height: 50,
    };
    return (
      <Dialog
        title={translate('user.login')}
        open={this.props.open}
        onRequestClose={this.props.closeLoginModal}
        contentStyle={{ width: 540 }}
      >
        <GridList
          cellHeight="auto"
          cols={2}
          padding={20}
        >
          <GridTile>
            <GoogleLoginButton
              text={translate('user.via-google')}
              style={buttonStyle}
              onClick={loginViaGoogle}
            />
            <FacebookLoginButton
              text={translate('user.via-facebook')}
              style={buttonStyle}
              onClick={loginViaFacebook}
            />
            <Button
              color='primary'
              variant='contained'
              style={{ height: 50 }}
              buttonStyle={{ textAlign: 'left' }}
              fullWidth={true}
              onClick={this.props.openSignUpModal}
            >
              <EmailIcon />
              {translate('user.signup')}
            </Button>
          </GridTile>
          <GridTile>
            <TextField
              id='login-email'
              floatingLabelText={translate('user.email')}
              value={this.props.credentials.email}
              onChange={changeEmail}
              fullWidth={true}
              type="email"
              style={{ marginTop: -20 }}
            />
            <TextField
              id='login-password'
              floatingLabelText={translate('user.password')}
              value={this.props.credentials.password}
              onChange={changePassword}
              fullWidth={true}
              type="password"
              errorText={this.props.loginFailed ? translate('user.login-failed') : null}
            />
            <Button
              color='primary'
              variant='contained'
              onClick={login}
              fullWidth={true}
              style={{ marginTop: 10 }}>{translate('user.login')}</Button>

          </GridTile>
        </GridList>
      </Dialog>
    );
  }
}
