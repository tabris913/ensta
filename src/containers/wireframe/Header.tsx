import { Layout } from 'antd';
import * as React from 'react';

const style: React.CSSProperties = {
  background: '#eee',
  padding: '20px 0px 0px 10px',
  borderBottom: 'solid 1px',
  fontSize: '400%',
  fontFamily: 'Monotype Corsiva',
  verticalAlign: 'middle',
  height: 100,
};

// props from parent
interface IOwnProps {
  // logout: () => void;
}

// props of this component extracted from Store
interface IStateProps {}

// entire props of this component
type Props = IStateProps & IOwnProps;

export const Header = (props: Props) => {
  return <Layout.Header style={style}>From Dusk 'Til Dawn</Layout.Header>;
};

export default Header;
