import { Button, Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICard } from '../../models/card';
import { ListComponentProps } from '../../models/Main';
import { cardIds, getCard } from '../../utils/CardUtils';
import { getCharacter } from '../../utils/CharacterUtils';

const Card = (props: ListComponentProps<ICard>) => {
  const card = cardIds.map(getCard);
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
        dataSource={card}
        renderItem={(item, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${pageKey}`}
                header={
                  <img
                    src={`./images/card/${item.content[0]}/${item.img[0]}`}
                    alt={item.name}
                    style={{ padding: 0, maxWidth: 280, width: '100%' }}
                  />
                }
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div
                    onClick={() => props.history.push(toPublicUrl(PageName.CARD, undefined, { id: item.uid }))}
                    onTouchEnd={() => props.history.push(toPublicUrl(PageName.CARD, undefined, { id: item.uid }))}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                <Descriptions size="small">
                  <Descriptions.Item label="キャラクター">{getCharacter(item.character)}</Descriptions.Item>
                  <Descriptions.Item label="レアリティ">{item.rank}</Descriptions.Item>
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
