import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { translate } from '../localization';
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";


export default class FeedbackModal extends React.Component {
  render() {
    if (this.props.justSent) {
      const actions = [
        <Button
          aria-label={translate('Close')}
          color='primary'
          variant='contained'
          key='close'
          onClick={this.props.closeFeedbackModal}>{translate('Close')}</Button>,
      ];
      return (
        <Dialog
          open={this.props.open}
          onClose={this.props.closeFeedbackModal}
        >
          <DialogTitle>
            {translate('feedback.thanks')}
          </DialogTitle>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      );
    }
    const changeComment = (event) => {
      const feedback = {
        comment: event.target.value,
        email: this.props.email,
      };
      this.props.changeFeedback(feedback);
    }
    const changeEmail = (event) => {
      const feedback = {
        comment: this.props.comment,
        email: event.target.value,
      };
      this.props.changeFeedback(feedback);
    }
    const submitFeedback = () => {
      const feedback = {
        comment: this.props.comment,
        email: this.props.email,
      };
      this.props.submitFeedback(feedback);
    };
    const actions = [
      <Button
        aria-label={translate('feedback.submit')}
        color='primary'
        variant='contained'
        key="submit"
        onClick={submitFeedback}>{translate('feedback.submit')}</Button>,
    ];
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeFeedbackModal}
      >
        <DialogTitle>{translate('feedback.title')}</DialogTitle>
        <DialogContent>
          {translate('feedback.question')}
        <TextField
          id='feedback-comment'
          placeholder={this.props.comment}
          onChange={changeComment}
          rows={5}
          fullWidth={true}
          multiline
        />
        <TextField
          id='feedback-email'
          label={translate('feedback.email')}
          placeholder={this.props.email}
          onChange={changeEmail}
          fullWidth={true}
        />
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </Dialog>
    );
  }
}
