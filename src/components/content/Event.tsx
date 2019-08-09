import { Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { eventIds, getEvent } from '../../utils/EventUtils';

const Event = (props: MainContentProps) => {
  const event = eventIds.map(getEvent);
  return (
    <List
      itemLayout="vertical"
      dataSource={event}
      renderItem={(item, idx) =>
        !!item ? (
          <Collapse style={{ width: '100%' }}>
            <Collapse.Panel key={idx} header={<img src={item.img} alt={item.name} />} showArrow={false}>
              <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                <div
                  onClick={() => {
                    // props.history.push(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }))
                    console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                  }}
                >
                  {item.name}
                </div>
              </Typography.Title>
              <p>{item.description_short}</p>
              <Descriptions size="small">
                <Descriptions.Item label="é–‹å§‹">{item.start}</Descriptions.Item>
                <Descriptions.Item label="çµ‚äº†">{item.end}</Descriptions.Item>
              </Descriptions>
            </Collapse.Panel>
          </Collapse>
        ) : (
          undefined
        )
      }
      style={{ overflowY: 'auto', overflowX: 'visible' }}
    />
  );
};

export default Event;
