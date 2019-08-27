import * as React from 'react';

import { Descriptions } from 'antd';
import { ICharacter } from '../../models/character';
import { ListComponentProps } from '../../models/Main';
import { getUnit } from '../../utils/UnitUtils';
import ListGenerator from './Base';

const CharacterList = (props: ListComponentProps<ICharacter>) =>
  ListGenerator({
    ...props,
    pageSize: 14,
    headers: item => (
      <img
        src={`./images/character/${item.imgs[0]}`}
        alt={item.name}
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
    ),
    descriptions: ({ item }) => (
      <>
        <p>{item.catchPhrase}</p>
        <Descriptions size="small">
          {item.class ? <Descriptions.Item label="クラス">{item.class}</Descriptions.Item> : <></>}
          {item.unit.length > 0 ? (
            <Descriptions.Item label="ユニット">
              {item.unit.map((uid, idx2) => (
                <p key={idx2}>{getUnit(uid)!.name}</p>
              ))}
            </Descriptions.Item>
          ) : (
            <></>
          )}
        </Descriptions>
      </>
    ),
  });

export default CharacterList;
