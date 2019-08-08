import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardTitle from '@material-ui/core/CardHeader';
import CardText from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import DownloadIcon from '@material-ui/icons/GetApp';
import ChartIcon from '@material-ui/icons/Assessment';
import CodeIcon from '@material-ui/icons/Code';
import DBIcon from '@material-ui/icons/Storage';
import APIIcon from '@material-ui/icons/Public';
import ErrorReportIcon from '@material-ui/icons/ReportProblem';
import {
  LineChart, XAxis, YAxis, Line, Bar, BarChart,
  CartesianGrid, Tooltip } from 'recharts';
import GHIcon from '../components/GitHubIcon';
import { toTitle } from '../utils/text';
import { theme } from '../theme';
import LongPage from '../components/LongPage';


const cardStyle = {
  margin: 10,
  width: '47%',
  minWidth: 500,
  display: 'inline-block',
  backgroundColor: '#3b3b3b',
};


const wideCardStyle = {
  ...cardStyle,
  width: 'auto',
  display: 'block',
};


const chartMargin = {
  top: 0,
  bottom: 0,
  left: -25,
  right: 5,
};


class RotatedAxisTick extends React.Component {
  render () {
    const {x, y, payload} = this.props;
    return (
      <g transform={`translate(${x - 11},${y})`}>
        <text
          x={0} y={0} dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-90)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class MonitoringPage extends React.Component {
  renderMetricPlot(name, domain = [0, 'auto']) {
    const data = getDataForPlot(this.props.metrics, name);
    return (
      <Card style={cardStyle} key={name}>
        <CardTitle title={toTitle(name)} />
        <CardText>
          <LineChart width={480} height={300} margin={chartMargin} data={data}>
            <XAxis dataKey="time"/>
            <YAxis domain={domain} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelStyle={{ color: '#555' }} />
            <Line type="monotone" dataKey="value" stroke={theme.palette.primary2Color} />
          </LineChart>
        </CardText>
      </Card>
    );
  }

  renderTaskMetricPlot(name, domain = [0, 'auto']) {
    const data = getDataForTasksPlot(this.props.metrics, name);
    return (
      <Card style={wideCardStyle} key={`tasks-${name}`}>
        <CardTitle title={`${toTitle(name)} for Tasks`} />
        <CardText>
          <BarChart width={1000} height={400} margin={chartMargin} data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={<RotatedAxisTick />} interval={0} height={200} />
            <YAxis allowDecimals={false}  domain={domain}/>
            <Tooltip labelStyle={{ color: '#555' }} />
            <Bar dataKey="value" fill={theme.palette.primary2Color} />
          </BarChart>
        </CardText>
      </Card>
    );
  }

  renderAdminCard() {
    return (
      <Card style={cardStyle} key="admin-card">
        <CardTitle title="Admin" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="/admin/learn/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="DB Admin"
              leftIcon={<DBIcon />}
              secondaryText="DB tables (tasks, levels, task sessions, etc.)"
            />
            <Divider />
            <ListItem
              href="/admin/mmc/mmclog/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Executed Management Commands"
              leftIcon={<DBIcon />}
              secondaryText="DB table containing logs about commands executed by cron."
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/tree/master/tasks/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Task Source Files"
              leftIcon={<CodeIcon />}
              secondaryText="[repo]//tasks/*.md"
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/tree/master/frontend/src/localization"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Localization Messages"
              leftIcon={<CodeIcon />}
              secondaryText="[repo]//frontend/src/localization/messages-*.js"
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderAnalyticsCard() {
    return (
      <Card style={{...cardStyle, backgroundColor: '#3b4c74'}} key="analytics-card">
        <CardTitle title="Analytics" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="https://analytics.google.com/analytics/web/#embed/report-home/a81667720w121094822p126691725/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Google Analytics - Overview"
              leftIcon={<ChartIcon />}
              secondaryText="https://analytics.google.com > robomise.cz > Home"
            />
            <Divider />
            <ListItem
              href="https://analytics.google.com/analytics/web/#report/content-event-overview/a81667720w121094822p126691725/%3Foverview-dimensionSummary.selectedGroup%3Dvisitors%26overview-dimensionSummary.selectedDimension%3Danalytics.eventAction/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Google Analytics - Events"
              leftIcon={<ChartIcon />}
              secondaryText="Behavior > Events > Overview"
            />
            <Divider />
            {/*
            <ListItem
              href="https://github.com/adaptive-learning/robomission/tree/master/frontend/src/sagas/googleAnalytics.js"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Events Sent to Google Analytics"
              leftIcon={<CodeIcon />}
              secondaryText="[repo]//frontend/src/sagas/googleAnalytics.js"
            />
            <Divider />
            */}
            <ListItem
              href="/media/exports/monitoring_latest.html"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Monitoring Jupyter Notebook"
              leftIcon={<ChartIcon />}
              secondaryText="[web]/media/exports/monitoring_latest.html"
            />
            <Divider />
            <ListItem
              href="/admin/monitoring/metric/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Metrics (DB Table)"
              leftIcon={<DBIcon />}
              secondaryText="Plots from recent metric records are below."
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderDevelopmentCard() {
    return (
      <Card style={cardStyle} key="development-card">
        <CardTitle title="Development" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Code Repository"
              leftIcon={<GHIcon />}
              secondaryText="https://github.com/adaptive-learning/robomission"
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/issues"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="GitHub Issues"
              leftIcon={<GHIcon />}
              secondaryText="https://github.com/adaptive-learning/robomission/issues"
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/tree/master/docs"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Documentation"
              leftIcon={<GHIcon />}
              secondaryText="[repo]//docs"
            />
            <Divider />
            <ListItem
              href="/learn/api"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="REST API"
              leftIcon={<APIIcon />}
              secondaryText="http://robomise.cz/learn/api"
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderExportCard() {
    return (
      <Card style={cardStyle} key="export-card">
        <CardTitle title="Export" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="/learn/export/latest/bundle/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Download Latest Bundle"
              leftIcon={<DownloadIcon />}
              secondaryText="Zip bundle with both static and collected data."
            />
            <Divider />
            <ListItem
              href="/learn/export"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Export API"
              leftIcon={<APIIcon />}
              secondaryText="Generate and download CSV tables from the current data."
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/blob/master/docs/data.ipynb"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Data Description"
              leftIcon={<CodeIcon />}
              secondaryText="[repo]//docs/data.ipynb"
            />
            <Divider />
            <ListItem
              href="https://github.com/adaptive-learning/robomission/blob/master/docs/monitoring.md#data-investigation"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Data Investigation"
              leftIcon={<GHIcon />}
              secondaryText="[repo]//docs/monitoring.md#data-investigation"
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderErrorsCard() {
    return (
      <Card style={cardStyle} key="errors-card">
        <CardTitle title="Errors" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="https://groups.google.com/forum/#!forum/adaptive-programming-errors"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Unhandled B-E Errors"
              leftIcon={<ErrorReportIcon />}
              secondaryText="Google group 'adaptive-programming-errors'"
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderFeedbackCard() {
    return (
      <Card style={cardStyle} key="feedback-card">
        <CardTitle title="Feedback" />
        <CardText style={{ paddingTop: 0 }}>
          <List>
            <Divider />
            <ListItem
              href="/admin/monitoring/feedback/"
              target="_blank"
              rel="noreferrer noopener"
              primaryText="Feedback from Users"
              leftIcon={<DBIcon />}
              secondaryText="Messages submitted via feedback form."
            />
            <Divider />
          </List>
        </CardText>
      </Card>
    );
  }

  renderMetrics() {
    return [
      this.renderMetricPlot('active-students'),
      this.renderMetricPlot('solved-count'),
      this.renderMetricPlot('success-ratio', [0, 1]),
      this.renderMetricPlot('solving-hours'),
      this.renderTaskMetricPlot('solved-count'),
      this.renderTaskMetricPlot('success-ratio', [0, 1]),
      this.renderTaskMetricPlot('median-time'),
    ];
  }

  render() {
    const { metrics } = this.props;
    return (
      <LongPage>
        {this.renderAdminCard()}
        {this.renderDevelopmentCard()}
        {this.renderAnalyticsCard()}
        {this.renderExportCard()}
        {this.renderErrorsCard()}
        {this.renderFeedbackCard()}
        {metrics && this.renderMetrics()}
      </LongPage>
    );
  }
}

MonitoringPage.propTypes = {
  metrics: PropTypes.array,
};

MonitoringPage.defaultProps = {
};


/**
 * Extract values for given metric name and group and return it in the format
 * required by the recharts library.
 */
function getDataForPlot(metrics, name, group = null) {
  const data = metrics
    .filter(metric => metric.name === name && metric.group === group)
    .map(({ time, value }) => ({ time, value }));  // select only these 2 fields
  return data;
}


function getDataForTasksPlot(metrics, name) {
  const data = metrics
    .filter(metric => metric.name === name && metric.group !== null)
    .map(({ group, value }) => ({ name: group.split('.', 2)[1], value }))
    .sort((a, b) => (b.value - a.value));
  return data;
}


MonitoringPage = withStyles()(MonitoringPage);
export default MonitoringPage;
