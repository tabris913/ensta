import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../wireframe/Wireframe';

import Scout from '../../components/main/ScoutList';
import { QueryType } from '../../models/Main';
import { IStoreState } from '../../reducers';

interface IOwnProps extends RouteComponentProps<{}> {}

interface IStateProps {
  query: QueryType;
}

interface IDispatchProps {}

type Props = IOwnProps & IStateProps & IDispatchProps;

const mapState2Props = (state: IStoreState, ownProps: IOwnProps): IStateProps => ({
  query: ownProps.location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce((o, s) => ({ ...o, [s.replace(/=.+$/, '')]: s.replace(/^.+=/, '') }), {}),
});

const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps => {
  return {};
};

const ScoutListPage = (props: Props) => (
  <Wireframe title="Scout" breadcrump={[{ label: 'Scout' }]}>
    <Scout {...props} />
  </Wireframe>
);

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(ScoutListPage)
);
