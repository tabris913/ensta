import { Layout, Menu } from 'antd';
import * as React from 'react';

import PageName from '../../constants/PageName';
import { ISider, ISiderSub } from '../../models/wireframe/Sider';
import { isSiderSub } from '../../utils/SiderUtils';

interface IOwnProps {
  pathname: string;
  onClickMenu: (menuKey: PageName) => void;
  title?: string;
  body: Array<ISider | ISiderSub>;
  theme?: 'dark' | 'light';
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  reverseArrow?: boolean;
}

interface IStateProps {}

type Props = IStateProps & IOwnProps;

const Sider = (props: Props) => {
  const makeMenuItem = ({ key, label, toPage }: ISider) => (
    <Menu.Item key={key} onClick={() => props.onClickMenu(toPage || PageName.TOP)} style={{ color: '#1890ff' }}>
      {label}
    </Menu.Item>
  );

  return (
    <Layout.Sider
      width={250}
      breakpoint={props.breakpoint}
      collapsedWidth="0"
      // collapsible={false}
      reverseArrow={props.reverseArrow}
    >
      <div
        style={{
          /*width: 120px;*/
          /*height: 64px;*/
          height: '60px',

          /*background: rgba(255, 255, 255, 0.2);*/
          margin: '0 auto',
          paddingTop: '18px',
          color: '#fff', // '#1890ff'
          fontSize: '2em',
          /*float: left;*/
          textAlign: 'center',
        }}
      >
        {props.title || undefined}
      </div>
      <Menu
        theme={props.theme || 'dark'}
        mode="inline"
        selectable={false}
        defaultOpenKeys={props.body.map((item, idx) => (isSiderSub(item) ? idx.toString() : ''))}
      >
        {props.body.map((item, idx) =>
          isSiderSub(item) ? (
            <Menu.SubMenu key={idx.toString()} title={item.title} style={{ color: '#1890ff' }}>
              {item.items.map(makeMenuItem)}
            </Menu.SubMenu>
          ) : (
            makeMenuItem(item)
          )
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
