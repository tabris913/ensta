import { Collapse, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { eventIds, getEvent } from '../../utils/EventUtils';

const Event = (props: MainContentProps) => {
  const event = eventIds.map(getEvent);
  return (
    <List>
      <Collapse style={{ width: 300 }}>
        {event.map((item, idx) =>
          !!item ? (
            <Collapse.Panel key={idx} header={<img src={item!.banner} alt={item.name} />} showArrow={false}>
              <Typography.Title level={4}>{item.name}</Typography.Title>
            </Collapse.Panel>
          ) : (
            undefined
          )
        )}
      </Collapse>
    </List>
  );
};

export default Event;
