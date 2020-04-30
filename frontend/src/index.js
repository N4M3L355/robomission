import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-intl-redux';
import { globalConfiguration } from './config';
import { createFlocsStore } from './store';
import FlocsThemeProvider from './theme/FlocsThemeProvider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PracticePage from './pages/PracticePage';
import TaskEditorPage from './pages/TaskEditorPage';
import TasksTableContainer from './containers/TasksTableContainer';
import MonitoringPage from './containers/MonitoringPage';
import PrivateRoute from './containers/PrivateRoute';

//TODO: setup service worker to work in production
// (see create-react-app for details)
import register from './registerServiceWorker';

register();

globalConfiguration();

const store = createFlocsStore();
const app = (
  <Provider store={store}>
    <FlocsThemeProvider>
      <BrowserRouter>
        <AppContainer>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path="/tasks" component={TasksTableContainer} />
            <Route exact path="/task-editor" component={TaskEditorPage} />
            <Route path="/task/:taskId" component={PracticePage} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/monitoring" component={MonitoringPage} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </FlocsThemeProvider>
  </Provider>
);

const mountElement = document.getElementById('flocsApp');
ReactDOM.render(app, mountElement);
