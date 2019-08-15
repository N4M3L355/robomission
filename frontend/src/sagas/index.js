import { delay } from 'redux-saga/effects'
import { all, call, cancel, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../actions';
import * as actionType from '../action-types';
import { getCurrentUserUrl, getWorldUrl } from '../selectors/api';
import { getStudentUrl,
         getPracticeOverviewUrl,
         getStartTaskUrl,
         getReportProgramEditUrl,
         getReportProgramExecutionUrl,
         getWatchInstructionUrl } from '../selectors/student';
import { getTaskById,
         getToolbox } from '../selectors/task';
import { getTaskId,
         getRoboAst,
         getMiniRoboCode,
         getLengthLimit,
         getTaskSourceText,
         getPauseLength,
         isInterpreting } from '../selectors/taskEnvironment';
import { sense, isSolved, isNotRunning } from '../selectors/gameState';
import { getNextLevelStatus } from '../selectors/practice';
import { getUser } from '../selectors/user';
import { interpretRoboAst, InterpreterError } from '../sagas/roboCodeInterpreter';
import { parseTaskSourceText } from '../core/taskSourceParser';
import { downloadTextFile, loadTextFile } from '../utils/files';
import authSaga from './auth';
import googleAnalyticsSaga from './googleAnalytics';
import feedbackSaga from './feedback';
import monitoringSaga from './monitoring';


function* fetchApiRoot() {
  try {
    const apiRoot = yield call(api.fetchApiRoot);
    yield put(actions.fetchApiRoot.success(apiRoot));
  } catch (error) {
    yield put(actions.fetchApiRoot.failure(error));
  }
}


function* fetchWorld(action) {
  try {
    const world = yield call(api.fetchWorld, action.payload.url);
    yield put(actions.fetchWorld.success(world));
  } catch (error) {
    yield put(actions.fetchWorld.failure(error));
  }
}


function* fetchUser(action) {
  try {
    const user = yield call(api.fetchUser, action.payload.url);
    yield put(actions.fetchUser.success(user));
  }
  catch (error) {
    yield put(actions.fetchUser.failure(error));
  }
}


function* fetchStudent(action) {
  try {
    const { url } = action.payload;
    const student = yield call(api.fetchStudent, url);
    yield put(actions.fetchStudent.success(student));
  } catch (error) {
    yield put(actions.fetchStudent.failure(error));
  }
}


function* fetchPracticeOverview(action) {
  try {
    const { url } = action.payload;
    const practiceOverview = yield call(api.fetchPracticeOverview, url);
    yield put(actions.fetchPracticeOverview.success(practiceOverview));
  } catch (error) {
    yield put(actions.fetchPracticeOverview.failure(error));
  }
}


function* watchInstruction(action) {
  try {
    yield* createNewUserIfNeeded();
    const { instructionId } = action.payload;
    const url = yield select(getWatchInstructionUrl);
    yield call(api.seeInstruction, url, instructionId);
    yield put(actions.seeInstruction.success(instructionId));
  } catch (error) {
    yield put(actions.seeInstruction.failure(error));
  }
}


function* watchTasks() {
  const openTaskFlows = {};
  while (true) {
    const action = yield take(actionType.SET_TASK);
    const { taskEnvironmentId, task } = action.payload;
    const oldFlow = openTaskFlows[taskEnvironmentId];
    if (oldFlow) {
      yield cancel(oldFlow);
    }
    const newFlow = yield fork(taskFlow, taskEnvironmentId, task);
    openTaskFlows[taskEnvironmentId] = newFlow;
  }
}


function* doActionMove(taskEnvironmentId, actionName, interruptible) {
  // Third of the time is used for block highlighting (see highlightBlock
  // function), third after action (e.g. laser), third after movement.
  const pause = 0.33 * (yield select(getPauseLength, taskEnvironmentId));
  // TODO: dry repeated interruption check
  let interpreting = yield select(isInterpreting, taskEnvironmentId);
  if (interruptible && !interpreting) {
    return;
  }
  yield put(actions.doAction(taskEnvironmentId, actionName));
  yield delay(pause);
  interpreting = yield select(isInterpreting, taskEnvironmentId);
  if (interruptible && !interpreting) {
    return;
  }
  yield put(actions.move(taskEnvironmentId));
  yield delay(pause);
  interpreting = yield select(isInterpreting, taskEnvironmentId);
  if (interruptible && !interpreting) {
    return;
  }
  yield put(actions.evolveWorld(taskEnvironmentId));
}


function* highlightBlock(taskEnvironmentId, blockId) {
  // Third of the usual step time is used for highligthing, two thirds for
  // intermediate visualizations.
  const highlightPause = 0.33 * (yield select(getPauseLength, taskEnvironmentId));
  if (highlightPause > 0) {
    yield put(actions.highlightBlock(taskEnvironmentId, blockId))
    yield delay(highlightPause);
  }
}


function* taskFlow(taskEnvironmentId, task) {
  while (true) {
    const action = yield take([actionType.RUN_PROGRAM_START, actionType.DO_ACTION_MOVE]);
    if (action.payload.taskEnvironmentId !== taskEnvironmentId) {
      continue;
    }
    if (action.type === actionType.DO_ACTION_MOVE) {
      const actionName = action.payload.action;
      const interruptible = action.payload.interruptible;
      yield* doActionMove(taskEnvironmentId, actionName, interruptible);
    }

    if (action.type === actionType.RUN_PROGRAM_START) {
      // TODO: factor out limit check
      const { limit, used } = yield select(getLengthLimit, taskEnvironmentId);
      if (limit !== null && used > limit) {
        alert(`Violated actions limit: ${used}/${limit}`);
        continue;
      }

      const roboAst = yield select(getRoboAst, taskEnvironmentId);
      yield put(actions.interpretationStarted(taskEnvironmentId));
      const effects = {
        isStopped: () => select(isNotRunning, taskEnvironmentId),
        sense: (sensor) => select(sense, taskEnvironmentId, sensor),
        doAction: (actionName) => call(doActionMove,
          taskEnvironmentId, actionName, true),
        highlightBlock: (blockId) => call(highlightBlock,
          taskEnvironmentId, blockId),
      };
      try {
        yield* interpretRoboAst(roboAst, effects);
      } catch (error) {
        if (error instanceof InterpreterError) {
          alert(error.message);
        } else {
          throw error;
        }
      }
      // wait to allow the student to see the world after the last step
      yield delay(300);
      yield put(actions.interpretationFinished(taskEnvironmentId));
    }
  }
}


function* createNewUserIfNeeded() {
  let user = yield select(getUser);
  if (!user.created) {
    // TODO: move createUserUrl to the API module
    const createUserUrl = '/learn/api/users/create';
    yield* fetchUser(actions.fetchUser.request(createUserUrl));
    user = yield select(getUser);
    if (!user.created) {
      throw new Error('Failed to create a user.')
    } else {
      const studentUrl = yield select(getStudentUrl);
      yield* fetchStudent(actions.fetchStudent.request(studentUrl));
    }
  }
}


function* startTask(action) {
  const { taskEnvironmentId, taskId } = action.payload;
  const setTaskByIdAction = actions.setTaskById(taskEnvironmentId, taskId);
  yield put(setTaskByIdAction);

  yield* createNewUserIfNeeded();

  const startTaskUrl = yield select(getStartTaskUrl);
  const { taskSessionId } = yield call(api.startTask, startTaskUrl, taskId);
  const programEditUrl = yield select(getReportProgramEditUrl);
  const programExecutionUrl = yield select(getReportProgramExecutionUrl);
  let prevMiniCode = null;
  let miniCode = null;
  while (true) {
    const action = yield take([
      actionType.START_TASK_REQUEST,
      actionType.INTERPRETATION_FINISHED,
      actionType.EDIT_PROGRAM_AST,
      actionType.EDIT_PROGRAM_CODE,
    ]);
    if (action.payload.taskEnvironmentId !== taskEnvironmentId) {
      continue;
    }
    if (action.type === actionType.START_TASK_REQUEST) {
      // Terminate current saga when new task starts in this task environment.
      break;
    } else if (action.type === actionType.EDIT_PROGRAM_AST) {
      prevMiniCode = miniCode;
      miniCode = yield select(getMiniRoboCode, taskEnvironmentId);
      if (prevMiniCode !== null && prevMiniCode !== miniCode) {
        yield call(api.reportProgramEdit, programEditUrl, taskSessionId, miniCode);
      }
    } else if (action.type === actionType.EDIT_PROGRAM_CODE) {
      // TODO: Report code edits.
      console.warn('Reporting code edits not implemented yet.')
    } else if (action.type === actionType.INTERPRETATION_FINISHED) {
      const program = yield select(getMiniRoboCode, taskEnvironmentId);
      const solved = yield select(isSolved, taskEnvironmentId);
      const report = yield call(api.reportProgramExecution,
        programExecutionUrl, taskSessionId, program, solved);
      if (solved) {
        yield put(actions.runProgram.solvedReport(taskEnvironmentId, report));
      }
    }
  }
}


// Intercept setTask action to add complete task record
// (which is currently required by some reducers).
function* setTask(action) {
  const { taskEnvironmentId, taskId } = action.payload;
  const task = yield select(getTaskById, taskId);

  // inject toolbox - needed for some reducers
  task.toolbox = yield select(getToolbox, taskId);

  const setTaskAction = actions.setTask(taskEnvironmentId, task);
  yield put(setTaskAction);
}


function* initializeApp() {
  yield* fetchApiRoot();
  const worldUrl = yield select(getWorldUrl);
  yield* fetchWorld(actions.fetchWorld.request(worldUrl));
  const currentUserUrl = yield select(getCurrentUserUrl);
  yield* fetchUser(actions.fetchUser.request(currentUserUrl));

  const studentUrl = yield select(getStudentUrl);
  yield* fetchStudent(actions.fetchStudent.request(studentUrl));

  const practiceOverviewUrl = yield select(getPracticeOverviewUrl);
  const practiceOverviewAction = actions.fetchPracticeOverview.request(practiceOverviewUrl);
  yield* fetchPracticeOverview(practiceOverviewAction);
}


function* initializeAppOnLocationChange() {
  yield takeLatest(actionType.CHANGE_LOCATION, initializeApp);
}


function* exportTask(action) {
  const { taskEnvironmentId } = action.payload;
  try {
    const taskId = yield select(getTaskId, taskEnvironmentId);
    const taskSourceText = yield select(getTaskSourceText, taskEnvironmentId);
    downloadTextFile(`${taskId}.md`, taskSourceText);
  } catch (err) {
    alert(`Export failed: ${err.message}`);
  }
}


function* importTask(action) {
  const { taskEnvironmentId } = action.payload;
  try {
    const taskSourceText = yield call(loadTextFile);
    const task = parseTaskSourceText(taskSourceText);
    yield put(actions.setTask(taskEnvironmentId, task));
  } catch (err) {
    alert(`Import failed: ${err.message}`);
  }
}


function* showLevelProgress() {
  const nextLevelStatus = yield select(getNextLevelStatus);
  if (nextLevelStatus !== null) {
    yield put(actions.showLevelProgress.next(nextLevelStatus));
  }
}


function* watchActions() {
  yield takeLatest(actionType.FETCH_STUDENT_REQUEST, fetchStudent);
  yield takeLatest(actionType.FETCH_PRACTICE_OVERVIEW_REQUEST, fetchPracticeOverview);
  yield takeLatest([actionType.LOGIN_SUCCESS, actionType.LOGOUT_SUCCESS], initializeApp);

  yield takeLatest(actionType.EXPORT_TASK, exportTask);
  yield takeLatest(actionType.IMPORT_TASK, importTask);

  yield takeEvery(actionType.START_TASK_REQUEST, startTask);
  yield takeEvery(actionType.SET_TASK_BY_ID, setTask);
  yield takeEvery(actionType.SEE_INSTRUCTION_REQUEST, watchInstruction);
  yield takeLatest(actionType.SHOW_LEVEL_PROGRESS_START, showLevelProgress);
}


function* rootSaga() {
  yield all([
    initializeAppOnLocationChange(),
    watchActions(),
    watchTasks(),
    authSaga(),
    googleAnalyticsSaga(),
    feedbackSaga(),
    monitoringSaga(),
  ]);
}

export default rootSaga;
