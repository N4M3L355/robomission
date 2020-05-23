import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { FormattedMessage } from 'react-intl';
import {DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core";


export default class TaskFailedModal extends React.Component {
  render() {
    const actions = [
      <Button
        aria-label="reset"
        variant='outlined'
        secondary={true}
        keyboardFocused={true}
        onClick={this.props.resetGame}>Reset</Button>,
    ];
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.resetGame}
        overlayStyle={{ backgroundColor: 'transparent' }}
      >
        <DialogTitle/>
        <DialogContent>
          <FormattedMessage id={`fail-reason.${this.props.reason}`} />
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>

      </Dialog>
    );
  }
}
