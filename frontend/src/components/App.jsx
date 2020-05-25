import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import InstructionsContainer from '../containers/InstructionsContainer';
import FeedbackModalContainer  from '../containers/FeedbackModalContainer';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import { translate } from '../localization';


const propTypes = {
  children: PropTypes.node,
  showLoginModal: PropTypes.bool.isRequired,
  openSignUpModal: PropTypes.func.isRequired,
};

export default function App(props) {
  return (

    <div
        style={{
            backgroundColor: '#000',        //TODO: unhardcode
            //overflowX: 'hidden',
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
        }}
    >
      <InstructionsContainer />
      <HeaderContainer />
      <MenuContainer />
      { props.children }
      <FeedbackModalContainer />
      <LoginModal
        open={props.showLoginModal}
        credentials={props.credentials}
        loginFailed={props.loginFailed}
        changeCredentials={props.changeCredentials}
        closeLoginModal={props.closeLoginModal}
        openSignUpModal={props.openSignUpModal}
        login={props.login}
      />
      <SignUpModal
        open={props.showSignUpModal}
        credentials={props.credentials}
        profile={props.profile}
        fieldErrors={props.signUpModalErrors}
        changeCredentials={props.changeCredentials}
        changeProfile={props.changeProfile}
        closeSignUpModal={props.closeSignUpModal}
        signup={props.signUp}
      />
      <Snackbar
        open={props.snackbarMessageId !== null}
        message={props.snackbarMessageId ? translate(props.snackbarMessageId) : ''}
        autoHideDuration={4000}
        onClose={() => props.snackbarMessageId = null}
      />
    </div>
  );
}


App.propTypes = propTypes;
