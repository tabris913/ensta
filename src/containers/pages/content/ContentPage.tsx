import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

import Wireframe from '../../wireframe/Wireframe';

import PageName, { toPublicUrl } from '../../../constants/PageName';
import { IContent } from '../../../models/content';
import { MainContentProps, QueryType, TypeType } from '../../../models/Main';
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
  pageName: PageName;
  component: (props: MainContentProps) => JSX.Element;
  getFunc: (uid: string, type?: TypeType) => IContent | undefined;
}

const ContentPage = ({ pageTitle, pageName, component: Component, getFunc }: IPageGenerator) =>
  withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )((props: Props) => {
      const content = getFunc(props.query.id!, props.query.type);
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
