import * as React from 'react';

import { Descriptions } from 'antd';

import ListGenerator from './Base';

import { ListComponentProps } from '../../models/Main';
import { IScout } from '../../models/scout';
import { IScoutAdditionalState } from '../../reducers/contents/scout';

const ScoutList = (props: ListComponentProps<IScout, IScoutAdditionalState>) =>
  ListGenerator({
    ...props,
    headers: item => <img src={item.img} alt={item.name} style={{ padding: 0, maxWidth: 280, width: '100%' }} />,
    descriptions: ({ item }) => (
      <>
        <p>{item.description}</p>
        <Descriptions size="small">
          <Descriptions.Item label="開始">{item.start}</Descriptions.Item>
          <Descriptions.Item label="終了">{item.end}</Descriptions.Item>
        </Descriptions>
      </>
    ),
  });

export default ScoutList;
