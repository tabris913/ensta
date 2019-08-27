import * as React from 'react';

import { Descriptions } from 'antd';
import { ICharacter } from '../../models/character';
import { ListComponentProps } from '../../models/Main';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import { getUnit } from '../../utils/UnitUtils';
import ListGenerator from './Base';

const CharacterList = (props: ListComponentProps<ICharacter, ICharacterAdditionalState>) =>
  ListGenerator({
    ...props,
    pageSize: 14,
    headers: item => <>{item.name}</>,
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
