import { Divider, Layout, Typography } from 'antd';
import * as React from 'react';
import PageName from '../../constants/PageName';
import { SiderRightMenu } from '../../constants/SiderMenu';
import { Footer } from './Footer';
import Header from './Header';
import Sider from './Sider';

interface IOwnProps {
  pathname: string;
  title?: string;
  children?: React.ReactNode;
  breadcrump?: React.ReactNode;
}

type Props = IOwnProps;

const MainContent = (props: Props) => (
  <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
    <Header />
    <Layout
      style={{
        padding: 10,
        background: '#fff',
        height: '100%',
      }}
    >
      <Layout style={{ padding: 8 }}>
        {props.breadcrump}
        {props.title && <Typography.Title underline={true}>{props.title}</Typography.Title>}
        {props.children}
      </Layout>
      <Sider
        pathname={props.pathname}
        onClickMenu={(workTitle: PageName) => null}
        body={SiderRightMenu}
        title="Latest Reviews"
        breakpoint="md"
        reverseArrow={true}
      />
    </Layout>
    <Divider />
    <Footer />
  </Layout>
);

export default MainContent;
