import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-intl-redux';
import {globalConfiguration} from './config';
import {createFlocsStore} from './store';
import FlocsThemeProvider from './theme/FlocsThemeProvider';

//TODO: setup service worker to work in production
// (see create-react-app for details)
import register from './registerServiceWorker';
import {CssBaseline} from "@material-ui/core";
import LoadingIndicator from "./components/LoadingIndicator";

const AppContainer = React.lazy(() => import('./containers/AppContainer'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const PracticePage = React.lazy(() => import('./pages/PracticePage'));
const TaskEditorPage = React.lazy(() => import('./pages/TaskEditorPage'));
const TasksTableContainer = React.lazy(() => import('./containers/TasksTableContainer'));
const MonitoringPage = React.lazy(() => import('./containers/MonitoringPage'));
const PrivateRoute = React.lazy(() => import('./containers/PrivateRoute'));
register();

globalConfiguration();

const store = createFlocsStore();
const app = (
  <Provider store={store}>
      <FlocsThemeProvider>
        <BrowserRouter>
          <CssBaseline>
            <Suspense fallback={<LoadingIndicator/>}>
              <AppContainer>
                <Switch>
                  <Route exact path='/' component={HomePage}/>
                  <Route exact path="/tasks" component={TasksTableContainer}/>
                  <Route exact path="/task-editor" component={TaskEditorPage}/>
                  <Route path="/task/:taskId" component={PracticePage}/>
                  <Route exact path="/login" component={LoginPage}/>
                  <PrivateRoute exact path="/monitoring" component={MonitoringPage}/>
                </Switch>
              </AppContainer>
            </Suspense>
          </CssBaseline>
        </BrowserRouter>
      </FlocsThemeProvider>

  </Provider>
);

const mountElement = document.getElementById('flocsApp');
ReactDOM.render(app, mountElement);
