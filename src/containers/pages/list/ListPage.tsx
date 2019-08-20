import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import { contentActions } from '../../../actions';
import { ContentName } from '../../../constants/ContentName';
import { IContent } from '../../../models/content';
import { ListComponentProps, QueryType } from '../../../models/Main';
import { IStoreState } from '../../../reducers';

interface IOwnProps extends RouteComponentProps<{}> {}

interface IStateProps {
  query: QueryType;
}

interface IDispatchProps<T extends IContent> {
  actions: {
    saveContent: (req: T) => void;
  };
}

type Props<T extends IContent> = IOwnProps & IStateProps & IDispatchProps<T>;

const mapState2Props = (state: IStoreState, ownProps: IOwnProps): IStateProps => ({
  query: ownProps.location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce((o, s) => ({ ...o, [s.replace(/=.+$/, '')]: s.replace(/^.+=/, '') }), {}),
});

interface IPageGenerator<T extends IContent> {
  pageTitle: string;
  contentName: ContentName;
  component: (props: ListComponentProps<T>) => JSX.Element;
}

const ListPage = <T extends IContent>({ pageTitle, component: Component, contentName }: IPageGenerator<T>) => {
  const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps<T> => {
    return { actions: { saveContent: (req: T) => dispatch(contentActions[contentName].saveContent(req)) } };
  };

  return withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props<T>) => (
      <Wireframe title={pageTitle} breadcrump={[{ label: pageTitle }]}>
        <Component {...props} saveContent={props.actions.saveContent} />
      </Wireframe>
    ))
  );
};

export default ListPage;
