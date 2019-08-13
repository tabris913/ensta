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
            [PageName.EVENT_LIST, Page.EventListPage],
            [PageName.SCOUT_LIST, Page.ScoutListPage],
            // [PageName.UNIT_LIST, Page.UnitListPage],
            // [PageName.CHARACTER_LIST, Page.CharacterListPage],
            // [PageName.CARD_LIST, Page.CardListPage],
            [PageName.EVENT, Page.EventPage],
            [PageName.SCOUT, Page.ScoutPage],
            // [PageName.UNIT, Page.UnitPage],
            // [PageName.CHARACTER, Page.CharacterPage],
            // [PageName.CARD, Page.CardPage],
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
