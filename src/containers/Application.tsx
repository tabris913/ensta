import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageName, { toPublicUrl } from '../constants/PageName';
// import ApplicationManager from './ApplicationManager';
// import ApplicationErrorBoundary from '../components/errorBoundaries/ApplicationErrorBoundary';
// import NotificationErrorBoundary from '../components/errorBoundaries/NotificationErrorBoundary';

import * as Page from './pages';
// import PrivateRoute from './PrivateRoute';

import { LocaleProvider } from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import * as moment from 'moment-timezone';
// import '../constants/yupSchema/extend';
import 'moment/locale/ja';
import '../App.css';
moment.locale('ja');
moment.tz.setDefault('Asia/Tokyo');

type MakeRoute = [PageName, React.ComponentClass, boolean];

const makeRoute = ([pageName, component, suffix]: MakeRoute) => (
  <Route exact={true} path={toPublicUrl(pageName, suffix ? [':id?'] : [])} component={component} key={pageName} />
);

const Application = () => (
  <LocaleProvider locale={jaJP}>
    <React.Fragment>
      <div className="App">
        <Switch>
          {[
            [PageName.TOP, Page.TopPage],
            // [PageName.REVIEW_TOP, Page.ReviewTopPage],
          ]
            .map(e => e as MakeRoute)
            .map(e => makeRoute(e))}
          <Redirect to={toPublicUrl(PageName.TOP)} />
        </Switch>
      </div>
    </React.Fragment>
  </LocaleProvider>
);

export default Application;
