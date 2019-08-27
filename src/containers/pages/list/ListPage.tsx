import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import { contentActions } from '../../../actions';
import { ContentName } from '../../../constants/ContentName';
import { IContent } from '../../../models/content';
import { IContentState } from '../../../models/ContentState';
import { ListComponentProps, QueryType } from '../../../models/Main';
import { IListRequest } from '../../../models/request/ListRequest';
import { IStoreState } from '../../../reducers';

interface IOwnProps extends RouteComponentProps<{}> {}

interface IStateProps {
  query: QueryType;
  contents: { [K in ContentName]: IContentState<any> };
}

interface IDispatchProps<T extends IContent> {
  actions: {
    saveContent: (req: T) => void;
    getList: (req: IListRequest) => void;
    changeListPage: (req: number) => void;
  };
}

type Props<T extends IContent> = IOwnProps & IStateProps & IDispatchProps<T>;

const mapState2Props = (state: IStoreState, ownProps: IOwnProps): IStateProps => ({
  query: ownProps.location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce((o, s) => ({ ...o, [s.replace(/=.+$/, '')]: s.replace(/^.+=/, '') }), {}),
  contents: state.contents,
});

interface IPageGenerator<T extends IContent> {
  contentName: ContentName;
  component: (props: ListComponentProps<T>) => JSX.Element;
  pageSize?: number;
}

const ListPage = <T extends IContent>({ component: Component, contentName, pageSize }: IPageGenerator<T>) => {
  const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps<T> => {
    return {
      actions: {
        saveContent: (req: T) => dispatch(contentActions[contentName].saveContent(req)),
        getList: (req: IListRequest) => dispatch(contentActions[contentName].getList(req as any)),
        changeListPage: (req: number) => dispatch(contentActions[contentName].changeListPage(req)),
      },
    };
  };

  const ListPageBody = (props: Props<T>) => (
    <Component
      {...props}
      pageSize={pageSize}
      saveContent={props.actions.saveContent}
      getList={props.actions.getList}
      contentName={contentName}
      changeListPage={props.actions.changeListPage}
    />
  );

  return withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )(ListPageBody)
  );
};

export default ListPage;
