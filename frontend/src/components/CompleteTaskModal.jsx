import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import NextTaskButtonContainer from '../containers/NextTaskButtonContainer';
import LevelBar from '../components/LevelBar';
import Text from '../localization/Text';
import { translate } from '../localization';
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Link from "@material-ui/core/Link";


export default class CompleteTaskModal extends React.Component {
  constructor(props) {
    super();
    const { activeCredits, maxCredits } = props.levelStatus;
    this.state = {
      shownPercent: Math.floor(100 * activeCredits / maxCredits),
      shownCredits: activeCredits,
      animating: false,
    };
    this.animationTimer = null;
    this.showLevelProgress = props.showLevelProgress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open && this.props.levelStatus.hasNext) {
      this.showLevelProgress(this.props.levelProgress);
    }
    //// NOTE: Level changes withing a single dialog cannot currently happen.
    //if (this.props.levelStatus.level !== prevProps.levelStatus.level) {
    //  this.setState({ shownPercent: 0, shownCredits: 0, animating: true }, () => {
    //    // immediately update state again to avoid "decrease" animation
    //    this.setState({ shownPercent: 1 });
    //  });
    if (prevProps.levelStatus.activeCredits !== this.props.levelStatus.activeCredits) {
      this.animateProgress();
    }
  }


  animateProgress() {
    this.setState({ animating: true });
    const { activeCredits, maxCredits } = this.props.levelStatus;
    // clear any pending animation before starting a new one
    clearTimeout(this.animationTimer);
    const initialPause = 600;
    const stepPause = 15;
    const increaseBy1 = () => {
      if (this.state.shownCredits >= this.props.levelStatus.activeCredits) {
        clearTimeout(this.animationTimer);
        this.setState({ credits: activeCredits, animating: false });
        return;
      }
      const shownPercent = this.state.shownPercent + 1;
      const shownCredits = Math.min(activeCredits, Math.floor(maxCredits * shownPercent / 100));
      this.setState({ shownPercent, shownCredits });
      this.animationTimer = setTimeout(increaseBy1, stepPause);
    };
    this.animationTimer = setTimeout(increaseBy1, initialPause);
  }

  renderContinueButton(active = true) {
    return (
      <Button
        variant='outlined'
        onClick={this.showLevelProgress}
        disabled={!active}
        aria-disabled={!active}
        aria-label="Pokračovat"
      >Pokračovat</Button>      //TODO: translate?
    );
  }

  render() {
    let actions = [];
    const bottomMessages = [];
    if (this.props.levelStatus.hasNext && !this.state.animating) {
      actions = [this.renderContinueButton(true)];
    } else if (this.state.animating) {
      actions = [this.renderContinueButton(false)];
    } else {
      const { missionCompleted, nextMissionId } = this.props.levelStatus;
      if (missionCompleted) {
        bottomMessages.push(translate('Mission completed'));
        if (nextMissionId) {
          const missionStoryNameId = `ps.story.${nextMissionId}`;
          bottomMessages.push(
            `${translate('New mission')}: ${translate(missionStoryNameId)}`);
        }
      }
      // TODO: Uncomment/update if easy recommendations are reintroduced.
      //if (this.props.recommendation.isEasy) {
      //  bottomMessage = <Text id="easy-task-challenge" />
      //}
      actions = [
        <NextTaskButtonContainer key="next-task" />,
        <Link href="/tasks">
          <Button variant="outlined" aria-label={translate('Tasks')}>{<Text id="Tasks" />}</Button>
        </Link>
      ];
    }

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        contentStyle={{ textAlign: 'center' }}
      >
        <DialogTitle>{translate('excellent-task-solved')}</DialogTitle>
        <DialogContent>
          <LevelBar
            level={this.props.levelStatus.level}
            activeCredits={this.state.shownCredits}
            maxCredits={this.props.levelStatus.maxCredits}
            percent={this.state.shownPercent}
          />
          {bottomMessages.map((message, index) => (
            <div key={index} style={{ marginTop: 25 }}>
              {message}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </Dialog>
    );
  }
}
