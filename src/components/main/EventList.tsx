import { Button, Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { IEvent } from '../../models/Event';
import { MainContentProps } from '../../models/Main';
import { eventIds, getEvent } from '../../utils/EventUtils';
import { getUnitCollection, unitCollectionIds } from '../../utils/UCUtils';

const Event = (props: MainContentProps) => {
  let event: (IEvent | undefined)[];
  switch (props.query.type) {
    case 'special':
      event = [];
      break;
    case 'uc':
      event = unitCollectionIds.map(getUnitCollection);
      break;
    default:
      event = eventIds.map(getEvent);
      break;
  }
  const [pageKey, setPageKey] = React.useState(0);

  return (
    <>
      <List
        pagination={{
          pageSize: 10,
          onChange: () => {
            window.scrollTo(0, 0); // 効いてない
            setPageKey(pageKey + 1);
          },
        }}
        itemLayout="vertical"
        dataSource={event}
        renderItem={(item, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${pageKey}`}
                header={
                  <img
                    src={`./images/${props.query.type || 'event'}/${item.img}`}
                    alt={item.name}
                    style={{ padding: 0, maxWidth: 280, width: '100%' }}
                  />
                }
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div
                    onClick={() => {
                      props.history.push(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                    onTouchEnd={() => {
                      props.history.push(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                <p>{item.description_short}</p>
                <Descriptions size="small">
                  <Descriptions.Item label="開始">{item.start}</Descriptions.Item>
                  <Descriptions.Item label="終了">{item.end}</Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
            </Collapse>
          ) : (
            undefined
          )
        }
        style={{ overflowY: 'auto', overflowX: 'visible' }}
      />
      <Button onClick={props.history.goBack} type="primary">
        戻る
      </Button>
    </>
  );
};

export default Event;
