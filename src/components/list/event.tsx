import * as React from 'react';

import { Descriptions } from 'antd';

import ListGenerator from './Base';

import { IEvent } from '../../models/event';
import { ListComponentProps } from '../../models/Main';
import { IEventAdditionalState } from '../../reducers/contents/event';
import { isNormalEvent } from '../../utils/EventUtils';

const EventList = (props: ListComponentProps<IEvent, IEventAdditionalState>) =>
  ListGenerator({
    ...props,
    headers: item => (
      <img
        src={`./images/${props.query.type || 'event'}/${item.img}`}
        alt={item.name}
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
    ),
    descriptions: ({ item }) => (
      <>
        {isNormalEvent(item) ? <p>{item.description_short}</p> : undefined}
        <Descriptions size="small">
          <Descriptions.Item label="開始">{item.start}</Descriptions.Item>
          <Descriptions.Item label="終了">{item.end}</Descriptions.Item>
        </Descriptions>
      </>
    ),
  });

export default EventList;
