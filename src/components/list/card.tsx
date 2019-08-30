import * as React from 'react';

import { Descriptions } from 'antd';
import { ICard } from '../../models/card';
import { ListComponentProps } from '../../models/Main';
import { ICardAdditionalState } from '../../reducers/contents/card';
import { getCharacter } from '../../utils/CharacterUtils';
import ListGenerator from './Base';

const CardList = (props: ListComponentProps<ICard, ICardAdditionalState>) =>
  ListGenerator({
    ...props,
    headers: item => (
      <img
        src={`./images/card/${item.content[0]}/${item.img[0]}`}
        alt={item.name || `恒常 ☆${item.rank}`}
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
    ),
    descriptions: ({ item }) => {
      const chara = getCharacter(item.character);
      return (
        <>
          <Descriptions size="small">
            <Descriptions.Item label="キャラクター">{chara ? chara.name : '未登録'}</Descriptions.Item>
            <Descriptions.Item label="レアリティ">{item.rank}</Descriptions.Item>
          </Descriptions>
        </>
      );
    },
    filter: list => {
      console.log(list, props);
      return list ? (props.query.id === undefined ? list : list.filter(c => c.character === props.query.id)) : [];
    },
  });

export default CardList;
