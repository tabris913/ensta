import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import { MainContentProps, QueryType } from '../../../models/Main';
import { IStoreState } from '../../../reducers';

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

interface IPageGenerator {
  pageTitle: string;
  component: (props: MainContentProps) => JSX.Element;
}

const ListPage = ({ pageTitle, component: Component }: IPageGenerator) =>
  withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props) => (
      <Wireframe title={pageTitle} breadcrump={[{ label: pageTitle }]}>
        <Component {...props} />
      </Wireframe>
    ))
  );

export default ListPage;
