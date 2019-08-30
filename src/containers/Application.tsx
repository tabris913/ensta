import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageName, { toPublicUrl } from '../constants/PageName';

import * as Page from './pages';

import { LocaleProvider } from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import * as moment from 'moment-timezone';
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
          <Route path={toPublicUrl(PageName.TOP)} component={Page.TopPage} exact={true} />

          {/* ListPage */}
          <Route path={toPublicUrl(PageName.EVENT_LIST, [':type?'])} component={Page.EventListPage} exact={true} />
          {[
            [PageName.SCOUT_LIST, Page.ScoutListPage],
            [PageName.UNIT_LIST, Page.UnitListPage],
            [PageName.CHARACTER_LIST, Page.CharacterListPage],
            [PageName.CARD_LIST, Page.CardListPage],

            [PageName.EVENT, Page.EventPage, true],
            [PageName.SCOUT, Page.ScoutPage, true],
            [PageName.UNIT, Page.UnitPage, true],
            [PageName.CHARACTER, Page.CharacterPage, true],
            [PageName.CARD, Page.CardPage, true],

            [PageName.CHARACTER_HISTORY, Page.CharacterHistoryPage, true],
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
