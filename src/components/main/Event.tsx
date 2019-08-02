import { Collapse, List } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { eventIds, getEvent } from '../../utils/EventUtils';

const Event = (props: MainContentProps) => {
  const event = eventIds.map(getEvent);
  return (
    <List>
      <Collapse>
        {event.map((item, idx) =>
          !!item ? (
            <Collapse.Panel key={idx} header={<img src={item!.banner} />} showArrow={false}>
              {item.name}
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
