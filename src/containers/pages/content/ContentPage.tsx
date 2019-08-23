import * as R from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import { ContentName } from '../../../constants/ContentName';
import PageName, { toPublicUrl } from '../../../constants/PageName';
import { IContent } from '../../../models/content';
import { IContentState } from '../../../models/ContentState';
import { MainContentProps, QueryType, TypeType } from '../../../models/Main';
import { IStoreState } from '../../../reducers';

interface IOwnProps extends RouteComponentProps<{}> {}

interface IStateProps {
  query: QueryType;
  contents: { [K in ContentName]: IContentState<any> };
}

interface IDispatchProps {}

type Props = IOwnProps & IStateProps & IDispatchProps;

const mapState2Props = (state: IStoreState, ownProps: IOwnProps): IStateProps => ({
  query: ownProps.location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce((o, s) => ({ ...o, [s.replace(/=.+$/, '')]: s.replace(/^.+=/, '') }), {}),
  contents: state.contents,
});

const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps): IDispatchProps => {
  return {};
};

interface IPageGenerator<T extends IContent> {
  pageTitle: string;
  pageName: PageName;
  contentName: ContentName;
  component: (props: MainContentProps<T>) => JSX.Element;
  getFunc: (uid: string, type?: TypeType) => T | undefined;
}

const ContentPage = <T extends IContent>({
  pageTitle,
  pageName,
  component: Component,
  getFunc,
  contentName,
}: IPageGenerator<T>) =>
  withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props) => {
      if (R.isEmpty(props.contents[contentName])) {
        // props.getContent()
        // getFuncけす
      }
      const content = R.isEmpty(props.contents[contentName])
        ? getFunc(props.query.id!, props.query.type)
        : props.contents[contentName].content;

      return (
        <Wireframe
          title={content!.name}
          breadcrump={[
            props.query.type
              ? {
                  label: pageTitle,
                  hrefWithId: toPublicUrl(pageName, undefined, { type: props.query.type }),
                }
              : { label: pageTitle, href: pageName },
            { label: content!.name },
          ]}
        >
          <Component {...props} content={content} />
        </Wireframe>
      );
    })
  );

export default ContentPage;
