import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {translate} from '../localization';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {loginViaFacebook, loginViaGoogle} from "../api/auth";


export default function SignUpModal(props) {

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
  const changeNickname = (event) => {
    props.changeProfile({nickname: event.target.value});
  }
  const signup = () => {
    props.signup(props.profile, props.credentials);
  };
  const actions = [
    <Button
        aria-label={translate('user.signup')}
        color="primary"
        key="signup"
        onClick={signup}>{translate('user.signup')}</Button>,
  ];


  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (

      <Dialog
          open={props.open}
          onClose={props.closeSignUpModal}
          //maxWidth={}
      >
        <DialogTitle>{translate('user.signup')}</DialogTitle>
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
              id='signup-email'
              label={translate('user.email')}
              value={props.credentials.email}
              onChange={changeEmail}
              fullWidth
              type="email"
              required
              helperText={props.fieldErrors.email}
              error={!!props.fieldErrors.email}
          />
          <TextField
              id='signup-nickname'
              label={translate('user.nickname')}
              value={props.profile.nickname}
              onChange={changeNickname}
              fullWidth
          />
          <TextField
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
              id='signup-password'
              label={translate('user.password')}
              value={props.credentials.password}
              onChange={changePassword}
              fullWidth
              type={values.showPassword ? 'text' : 'password'}
              required
              helperText={props.fieldErrors.password}
              error={!!props.fieldErrors.password}
          />
        </DialogContent>
        <DialogActions>
          {actions}

        </DialogActions>
      </Dialog>
  );
}
