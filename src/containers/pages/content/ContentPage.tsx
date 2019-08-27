import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import { contentActions } from '../../../actions';
import { ContentName } from '../../../constants/ContentName';
import PageName, { toPublicUrl } from '../../../constants/PageName';
import { IContent } from '../../../models/content';
import { IContentState } from '../../../models/ContentState';
import { MainContentProps, QueryType } from '../../../models/Main';
import { IContentRequest } from '../../../models/request/ContentRequest';
import { IStoreState } from '../../../reducers';

interface IOwnProps extends RouteComponentProps<{}> {}

interface IStateProps {
  query: QueryType;
  contents: { [K in ContentName]: IContentState<any> };
}

interface IDispatchProps {
  actions: {
    getContent: (req: IContentRequest) => void;
  };
}

type Props = IOwnProps & IStateProps & IDispatchProps;

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
  const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps => {
    return {
      actions: {
        getContent: (req: IContentRequest) => dispatch(contentActions[contentName].getContent(req)),
      },
    };
  };

  return withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props) => {
      const localName = props.contents[contentName].content ? props.contents[contentName].content.name : '';
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
          <Component {...props} getContent={props.actions.getContent} />
        </Wireframe>
      );
    })
  );
};

export default ContentPage;
