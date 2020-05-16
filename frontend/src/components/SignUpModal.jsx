import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {translate} from '../localization';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


export default function SignUpModal(props) {
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
        color="primary"
        onClick={signup}>{translate('user.signup')}</Button>,
  ];
  return (

      <Dialog
          open={props.open}
          onClose={props.closeSignUpModal}
          //maxWidth={}
      >
        <DialogTitle>{translate('user.signup')}</DialogTitle>
        <DialogContent>
          <TextField
              id='signup-email'
              label={translate('user.email')}
              value={props.credentials.email}
              onChange={changeEmail}
              fullWidth
              type="email"
              required
              helperText={props.fieldErrors.email}
          />
          <TextField
              id='signup-nickname'
              label={translate('user.nickname')}
              value={props.profile.nickname}
              onChange={changeNickname}
              fullWidth
          />
          <TextField
              id='signup-password'
              label={translate('user.password')}
              value={props.credentials.password}
              onChange={changePassword}
              fullWidth
              type="password"
              required
              helperText={props.fieldErrors.password}
          />
        </DialogContent>
        <DialogActions>
          {actions}

        </DialogActions>
      </Dialog>
  );
}
