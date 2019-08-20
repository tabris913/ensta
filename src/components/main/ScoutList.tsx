import { Button, Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ListComponentProps } from '../../models/Main';
import { IScout } from '../../models/scout';
import { getScout, scoutIds } from '../../utils/ScoutUtils';

const Scout = (props: ListComponentProps<IScout>) => {
  let scout: Array<IScout | undefined>;
  switch (props.query.type) {
    case 'story':
      scout = [];
      break;
    case 'revival':
      scout = []; // unitCollectionIds.map(getUnitCollection);
      break;
    default:
      scout = scoutIds.map(getScout);
      break;
  }
  const [pageKey, setPageKey] = React.useState(0);

  return (
    <>
      <List
        pagination={{
          pageSize: 10,
          onChange: () => {
            window.scrollTo(0, 0); // 効㝄㝦㝪㝄
            setPageKey(pageKey + 1);
          },
        }}
        itemLayout="vertical"
        dataSource={scout}
        renderItem={(item, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${pageKey}`}
                header={
                  <img
                    src={`./images/${props.query.type || 'scout'}/${item.img}`}
                    alt={item.name}
                    style={{ padding: 0, maxWidth: 280, width: '100%' }}
                  />
                }
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div
                    onClick={() => {
                      props.history.push(toPublicUrl(PageName.SCOUT, undefined, { id: item.uid }));
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                    onTouchEnd={() => {
                      props.history.push(toPublicUrl(PageName.SCOUT, undefined, { id: item.uid }));
                      // console.log(toPublicUrl(PageName.EVENT, undefined, { id: item.uid }));
                    }}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                <p>{item.description}</p>
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

export default Scout;
