import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {DialogContent, DialogTitle} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons';
import {translate} from '../localization';
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";


export default function LoginModal(props) {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const changeEmail = (event) => {
    const credentials = {...props.credentials, email: event.target.value};
    props.changeCredentials(credentials);
  }
  const changePassword = (event) => {
    const credentials = {...props.credentials, password: event.target.value};
    props.changeCredentials(credentials);
  }

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const login = () => {
    props.login({credentials: props.credentials});
  };
  const loginViaFacebook = () => {
    props.login({provider: 'facebook'});
  };
  const loginViaGoogle = () => {
    props.login({provider: 'google'});
  };
  return (
      <Dialog
          open={props.open}
          onClose={props.closeLoginModal}
          contentStyle={{width: 540}}
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
              value={props.credentials.email}
              onChange={changeEmail}
              fullWidth={true}
              type="email"
              required
              error={props.loginFailed}
          />
          <TextField      //TODO: extract this to another component
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }}
              id='login-password'
              label={translate('user.password')}
              value={props.credentials.password}
              onChange={changePassword}
              fullWidth
              type={values.showPassword ? 'text' : 'password'}
              required
              error={props.loginFailed}
              helperText={props.loginFailed ? translate('user.login-failed') : null}
          />

        </DialogContent>
        <DialogActions>
          <Button
              color='primary'
              onClick={login}>{translate('user.login')}</Button>
          <Button
              color='primary'
              onClick={props.openSignUpModal}
          >
            <EmailIcon/>
            {translate('user.signup')}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
