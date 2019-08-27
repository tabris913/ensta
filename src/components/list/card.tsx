import * as React from 'react';

import { Descriptions } from 'antd';
import { ICard } from '../../models/card';
import { ListComponentProps } from '../../models/Main';
import { getCharacter } from '../../utils/CharacterUtils';
import ListGenerator from './Base';

const CardList = (props: ListComponentProps<ICard>) =>
  ListGenerator({
    ...props,
    headers: item => (
      <img
        src={`./images/card/${item.content[0]}/${item.img[0]}`}
        alt={item.name}
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
    ),
    descriptions: ({ item }) => (
      <>
        <Descriptions size="small">
          <Descriptions.Item label="キャラクター">{getCharacter(item.character)}</Descriptions.Item>
          <Descriptions.Item label="レアリティ">{item.rank}</Descriptions.Item>
        </Descriptions>
      </>
    ),
  });

export default CardList;
