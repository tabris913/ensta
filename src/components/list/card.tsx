import * as React from 'react';
import * as R from 'ramda';

import { Col, Descriptions, Row, Select } from 'antd';
import { ICard } from '../../models/card';
import { CardType, ListComponentProps, Rarelity } from '../../models/Main';
import { ICardAdditionalState } from '../../reducers/contents/card';
import { getCharacter, getCharacters } from '../../utils/CharacterUtils';
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
      let returnList = R.clone(list) || [];

      if (props.query.id) {
        returnList = returnList.filter(c => c.character === props.query.id);
      }
      if (props.query.rank) {
        returnList = returnList.filter(c => c.rank.toString() === props.query.rank!.toString());
      }
      if (props.query.cardType) {
        returnList = returnList.filter(c => c.type === props.query.cardType);
      }

      return returnList;
    },
    selector: ({ localState, setLocalState }) => {
      // const characterUid = props.query.id || '';
      // const character = getCharacter(characterUid);

      const makeRow = (label: string | React.ReactNode, body: string | React.ReactNode) => (
        <div style={{ verticalAlign: 'middle', width: '100%' }}>
          <Col style={{ paddingTop: 7, marginRight: 3, textAlign: 'right' }} xs={8}>
            {label}:{' '}
          </Col>
          <Col>{body}</Col>
        </div>
      );

      return (
        <>
          <Row type="flex">
            {makeRow(
              'キャラクター',
              <Select
                defaultValue={localState.id || 'all'}
                style={{ width: 150 }}
                // disabled={!!character}
                onChange={(e: string) =>
                  setLocalState(e === 'all' ? R.omit(['id'], localState) : { ...localState, id: e })
                }
              >
                <Select.Option value="all">すべて</Select.Option>
                {getCharacters().map(c => (
                  <Select.Option value={c.uid} key={c.uid}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Row>
          <Row type="flex">
            {makeRow(
              'レアリティ',
              <Select
                defaultValue={localState.rank || 'all'}
                style={{ width: 150 }}
                onChange={(e: Rarelity | 'all') =>
                  setLocalState(e === 'all' ? R.omit(['rank'], localState) : { ...localState, rank: e })
                }
              >
                <Select.Option value="all">すべて</Select.Option>
                {[5, 4, 3, 2, 1].map(r => (
                  <Select.Option value={r} key={r}>
                    {r}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Row>
          <Row type="flex">
            {makeRow(
              '種別',
              <Select
                defaultValue={localState.cardType || 'all'}
                style={{ width: 150 }}
                onChange={(e: CardType | 'all') =>
                  setLocalState(e === 'all' ? R.omit(['cardType'], localState) : { ...localState, cardType: e })
                }
              >
                <Select.Option value="all">すべて</Select.Option>
                {['Da', 'Vo', 'Pf'].map(t => (
                  <Select.Option value={t} key={t}>
                    {t}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Row>
        </>
      );
    },
  });

export default CardList;
