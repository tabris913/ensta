import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import { contentActions } from '../../../actions';
import { ContentName } from '../../../constants/ContentName';
import PageName, { toPublicUrl } from '../../../constants/PageName';
import { IContent } from '../../../models/content';
import { IContentsState } from '../../../models/ContentState';
import { IMatchParams, MainContentProps, QueryType } from '../../../models/Main';
import { IContentRequest } from '../../../models/request/ContentRequest';
import { IContentSaveRequest } from '../../../models/request/ContentSaveRequest';
import { IStoreState } from '../../../reducers';

interface IOwnProps extends RouteComponentProps<IMatchParams> {}

interface IStateProps {
  query: QueryType;
  contents: IContentsState;
}

interface IDispatchProps<T extends IContent> {
  actions: {
    getContent: (req: IContentRequest) => void;
    saveContent: (req: IContentSaveRequest<T>) => void;
    getHistory?: (req: IContentRequest) => void;
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
  pageTitle: string;
  pageName: PageName;
  contentName: ContentName;
  component: (props: MainContentProps<T>) => JSX.Element;
}

const ContentPage = <T extends IContent>({
  pageTitle,
  pageName,
  component: Component,
  contentName,
}: IPageGenerator<T>) => {
  const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps<T> => {
    return {
      actions: {
        getContent: (req: IContentRequest) => dispatch(contentActions[contentName].getContent(req)),
        saveContent: (req: IContentSaveRequest<T>) => dispatch(contentActions[contentName].saveContent(req)),
        getHistory:
          contentName === 'character'
            ? (req: IContentRequest) => dispatch(contentActions[contentName].getHistory!(req))
            : undefined,
      },
    };
  };

  return withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props<T>) => {
      const localName = props.contents[contentName].content ? props.contents[contentName].content!.name : '';
      return (
        <Wireframe
          title={localName}
          breadcrump={[
            props.query.type
              ? {
                  label: pageTitle,
                  hrefWithId: toPublicUrl(pageName, undefined, { type: props.query.type }),
                }
              : { label: pageTitle, href: pageName },
            { label: localName },
          ]}
        >
          <Component {...props} getContent={props.actions.getContent} getHistory={props.actions.getHistory} />
        </Wireframe>
      );
    })
  );
};

export default ContentPage;
