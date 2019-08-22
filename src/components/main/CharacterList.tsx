import { Button, Collapse, Descriptions, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
import { ListComponentProps } from '../../models/Main';
import { characterIds, getCharacter } from '../../utils/CharacterUtils';

const Character = (props: ListComponentProps<ICharacter>) => {
  const character = characterIds.map(getCharacter);
  const [pageKey, setPageKey] = React.useState(0);

  // 学年・クラスごと (デフォ)
  // 名前順
  // ソートができるように

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
        dataSource={character}
        renderItem={(item, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${pageKey}`}
                header={
                  <img
                    src={`./images/character/${item.imgs[0]}`}
                    alt={item.name}
                    style={{ padding: 0, maxWidth: 280, width: '100%' }}
                  />
                }
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div
                    onClick={() => props.history.push(toPublicUrl(PageName.CHARACTER, undefined, { id: item.uid }))}
                    onTouchEnd={() => props.history.push(toPublicUrl(PageName.CHARACTER, undefined, { id: item.uid }))}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                <p>{item.catchPhrase}</p>
                <Descriptions size="small">
                  {item.class ? <Descriptions.Item label="クラス">{item.class}</Descriptions.Item> : <></>}
                  {item.unit.length > 0 ? (
                    <Descriptions.Item label="ユニット">
                      {item.unit.map((uid, idx2) => (
                        <p key={idx2}>{getCharacter(uid)}</p>
                      ))}
                    </Descriptions.Item>
                  ) : (
                    <></>
                  )}
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

export default Character;
