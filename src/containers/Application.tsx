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
            [PageName.ABOUT, Page.AboutPage],
            [PageName.LINK, Page.LinkPage],
          ]
            .map(e => e as MakeRoute)
            .map(e => makeRoute(e))}

          {[
            [PageName.REVIEW_ARTIST, Page.ArtistsPage],
            // [PageName.NEW_RELEASE, Page.NewReleasePage],
            // [PageName.REVIEW_SCHEDULE, Page.ReviewSchedulePage],
            // [PageName.SCORE, Page.ScorePage],
            // [PageName.SELECTIONS, Page.SelectionsPage],
            // [PageName.YEAR_BESTS, Page.YearBestsPage],
            // [PageName.REVIEW_GENRES, Page.GenresPage],
            [PageName.SERIES, Page.SeriesPage],
          ]
            .map(e => e as MakeRoute)
            .map(e => makeRoute(e))}

          {[
            [PageName.ARTIST, Page.ArtistPage, true],
            // [PageName.GENRE, Page.GenrePage, true],
            // [PageName.SELECTION, Page.SelectionPage, true],
            [PageName.SERIES_CONTENT, Page.SeriesContentPage, true],
            // [PageName.YEAR_BEST, Page.YearBestPage, true],
            // [PageName.WORK, Page.WorkPage, true],
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
