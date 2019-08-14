import { Button, Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { IEvent, ISpecial, IUnitCollection } from '../../models/event';
import { MainContentProps } from '../../models/Main';
import { eventIds, getEvent, isNormalEvent } from '../../utils/EventUtils';
import { getSpecial, specialEventIds } from '../../utils/SpecialUtils';
import { getUnitCollection, unitCollectionIds } from '../../utils/UCUtils';

const Card = (props: MainContentProps) => {
  let event: Array<IEvent | IUnitCollection | ISpecial | undefined>;
  switch (props.query.type) {
    case 'special':
      event = specialEventIds.map(getSpecial);
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
                      props.history.push(
                        toPublicUrl(
                          PageName.EVENT,
                          undefined,
                          !props.query.type ? { id: item.uid } : { id: item.uid, type: props.query.type }
                        )
                      );
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                    onTouchEnd={() => {
                      props.history.push(
                        toPublicUrl(
                          PageName.EVENT,
                          undefined,
                          !props.query.type ? { id: item.uid } : { id: item.uid, type: props.query.type }
                        )
                      );
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                {isNormalEvent(item) ? <p>{item.description_short}</p> : undefined}
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
      <Button
        onClick={() => {
          props.history.goBack();
          props.history.replace(toPublicUrl(PageName.TOP));
        }}
        type="primary"
      >
        TOPに戻る
      </Button>
    </>
  );
};

export default Card;
