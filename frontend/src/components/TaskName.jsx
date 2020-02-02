import PropTypes from 'prop-types';
import { toTitle } from '../utils/text';
import { possiblyTranslate } from '../localization';


export default function TaskName({ taskId }) {
  return getLocalizedTaskName(taskId)
}


TaskName.propTypes = {
  taskId: PropTypes.string.isRequired,
};


function getLocalizedTaskName(taskId) {
  if (!taskId) {
    return '';
  }
  const fallback = toTitle(taskId);
  //return fallback;
  return possiblyTranslate(`task.${taskId}`, fallback);
}
