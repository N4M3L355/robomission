import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {DialogContent, DialogTitle, GridList, GridListTile as GridTile} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { translate } from '../localization';
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";


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
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeLoginModal}
        contentStyle={{ width: 540 }}
      >
        <DialogTitle>
          {translate('user.login')}
        </DialogTitle>
        <DialogContent>

          <Grid container>
            <Grid item>
              <GoogleLoginButton
                  variant='outlined'
                  text={translate('user.via-google')}
                  onClick={loginViaGoogle}
              />
            </Grid>
            <Grid item>
              <FacebookLoginButton
                  variant='outlined'

                  text={translate('user.via-facebook')}
                  onClick={loginViaFacebook}
              />
            </Grid>
          </Grid>
            <TextField
              id='login-email'
              label={translate('user.email')}
              value={this.props.credentials.email}
              onChange={changeEmail}
              fullWidth={true}
              type="email"
            />
            <TextField
              id='login-password'
              label={translate('user.password')}
              value={this.props.credentials.password}
              onChange={changePassword}
              fullWidth={true}
              type="password"
              errorText={this.props.loginFailed ? translate('user.login-failed') : null}
            />

        </DialogContent>
        <DialogActions>
          <Button
              color='primary'
              onClick={login}>{translate('user.login')}</Button>
          <Button
              color='primary'
              onClick={this.props.openSignUpModal}
          >
            <EmailIcon />
            {translate('user.signup')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
