import * as at from '../action-types';


function action(type, payload = {}) {
  return {type, payload}
}


export const fetchApiRoot = {
  //request: () => action(at.FETCH_API_ROOT_REQUEST),
  success: (apiRoot) => action(at.FETCH_API_ROOT_SUCCESS, apiRoot),
  failure: (error) => action(at.FETCH_API_ROOT_FAILURE, {error}),
}


export const fetchWorld = {
  //request: () => action(at.FETCH_WORLD_REQUEST),
  success: (world) => action(at.FETCH_WORLD_SUCCESS, world),
  failure: (error) => action(at.FETCH_WORLD_FAILURE, {error}),
}


export const fetchUser = {
  request: (url) => action(at.FETCH_USER_REQUEST, {url}),
  success: (user) => action(at.FETCH_USER_SUCCESS, user),
  failure: (error) => action(at.FETCH_USER_FAILURE, {error}),
}


export const fetchStudent = {
  request: (url) => action(at.FETCH_STUDENT_REQUEST, {url}),
  success: (student) => action(at.FETCH_STUDENT_SUCCESS, student),
  failure: (error) => action(at.FETCH_STUDENT_FAILURE, {error}),
}


export const fetchPracticeOverview = {
  request: (url) => action(at.FETCH_PRACTICE_OVERVIEW_REQUEST, {url}),
  success: (practiceOverivew) => action(at.FETCH_PRACTICE_OVERVIEW_SUCCESS, practiceOverivew),
  failure: (error) => action(at.FETCH_PRACTICE_OVERVIEW_FAILURE, {error}),
}


export function createTaskEnvironment(taskEnvironmentId) {
  return action(at.CREATE_TASK_ENVIRONMENT, { taskEnvironmentId });
}


export function setTask(taskEnvironmentId, task) {
  return action(at.SET_TASK, { taskEnvironmentId, task });
}


export function setTaskById(taskEnvironmentId, taskId) {
  return action(at.SET_TASK_BY_ID, { taskEnvironmentId, taskId });
}


export function changeGamePanelWidth(taskEnvironmentId, gamePanelWidth) {
  return action(at.CHANGE_GAME_PANEL_WIDTH, { taskEnvironmentId, gamePanelWidth });
}


export function changeCode(taskEnvironmentId, code) {
  return action(at.CHANGE_CODE, { taskEnvironmentId, code });
}


export function changeRoboAst(taskEnvironmentId, roboAst) {
  return action(at.CHANGE_ROBO_AST, { taskEnvironmentId, roboAst });
}


export function runProgram(taskEnvironmentId) {
  return action(at.RUN_PROGRAM, { taskEnvironmentId });
}


export function doActionMove(taskEnvironmentId, action, interruptible = true) {
  return action(at.DO_ACTION_MOVE, { taskEnvironmentId, action, interruptible });
}


export function resetGame(taskEnvironmentId) {
  return action(at.RESET_GAME, { taskEnvironmentId });
}
