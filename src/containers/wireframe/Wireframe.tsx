import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Redux from 'redux';

// @ts-ignore
import PageName, { toPublicUrl } from '../../constants/PageName';
import { SiderLeftMenu } from '../../constants/SiderMenu';
import { IBreadCrump } from '../../models/wireframe/BreadCrump';
import { IStoreState } from '../../reducers';
import breadCrump from './BreadCrump';
import MainContent from './Main';
import Sider from './Sider';

interface IOwnProps extends RouteComponentProps<{}> {
  title?: string;
  children?: React.ReactNode;
  breadcrump?: IBreadCrump[];
}

interface IStateProps {}

interface IDispatchProps {}

type Props = IStateProps & IOwnProps & IDispatchProps;

const mapState2Props = (state: IStoreState, ownProps: IOwnProps): IStateProps => ({});

const mapDispatch2Props = (dispatch: Redux.Dispatch, ownProps: IOwnProps) => {
  return {};
};

const Wireframe = (props: Props) => (
  <Layout style={{ height: '100vh' }}>
    <Sider
      pathname={props.location.pathname}
      onClickMenu={(menuKey: PageName) =>
        menuKey === PageName.UNDEFINED ? null : props.history.push(toPublicUrl(menuKey))
      }
      body={SiderLeftMenu}
      title="Menu"
      breakpoint="lg"
    />
    <MainContent
      pathname={props.location.pathname}
      title={props.title}
      children={props.children}
      breadcrump={breadCrump(props.breadcrump || [], props.history)}
    />
  </Layout>
);

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Wireframe)
);
