import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../wireframe/Wireframe';

import Event from '../../components/content/Event';
import PageName from '../../constants/PageName';
import { QueryType } from '../../models/Main';
import { IStoreState } from '../../reducers';
import { getEvent } from '../../utils/EventUtils';

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

const EventPage = (props: Props) => {
  const event = getEvent(props.query.id!);

  return (
    <Wireframe title={event!.name} breadcrump={[{ label: 'Event', href: PageName.EVENT_LIST }, { label: event!.name }]}>
      <Event {...props} />
    </Wireframe>
  );
};

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(EventPage)
);
