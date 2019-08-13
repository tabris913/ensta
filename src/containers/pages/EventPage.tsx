import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../wireframe/Wireframe';

import Event from '../../components/content/Event';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import { QueryType } from '../../models/Main';
import { IStoreState } from '../../reducers';
import { getEvent } from '../../utils/EventUtils';
import { getSpecial } from '../../utils/SpecialUtils';
import { getUnitCollection } from '../../utils/UCUtils';

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
  let event: IEvent | IUnitCollection | ISpecial | undefined;
  switch (props.query.type) {
    case 'special':
      event = getSpecial(props.query.id!);
      break;
    case 'uc':
      event = getUnitCollection(props.query.id!);
      break;
    default:
      event = getEvent(props.query.id!);
      break;
  }

  return (
    <Wireframe
      title={event!.name}
      breadcrump={[
        props.query.type
          ? { label: 'Event', hrefWithId: toPublicUrl(PageName.EVENT_LIST, undefined, { type: props.query.type }) }
          : { label: 'Event', href: PageName.EVENT_LIST },
        { label: event!.name },
      ]}
    >
      <Event {...props} event={event} />
    </Wireframe>
  );
};

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(EventPage)
);
