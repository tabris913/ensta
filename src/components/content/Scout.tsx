import { Button, Col, Descriptions, Divider, Rate, Row } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

import { MainContentProps } from '../../models/Main';
import { IScout } from '../../models/scout';
import { toCard } from '../../utils/CardUtils';
import { getCharacter } from '../../utils/CharacterUtils';

const Scout = (props: MainContentProps<IScout>) => {
  React.useState(() => {
    if (
      !props.contents ||
      !props.contents.scout.content ||
      props.contents.scout.content.uid !== props.match.params.id
    ) {
      props.getContent({ uid: props.match.params.id!, contentName: 'scout' });
    }
  });

  const contents = props.contents && props.contents.scout;

  const cards = (contents && contents.additional && contents.additional.card) || [];

  return contents && contents.content ? (
    <>
      <img src={contents.content.img} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <p>{contents.content.description}</p>
      <Descriptions
        title="Scout Info"
        column={{ xs: 1, md: 3 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{contents.content.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{contents.content.end}</Descriptions.Item>
        <Descriptions.Item label="排出カード">
          {R.intersperse(
            <Divider style={{ margin: 0 }} />,
            [5, 4, 3]
              .filter(r => !R.isEmpty(cards.filter(c => c.rank === r)))
              .map(r => (
                <Row type="flex" key={`cards.${r}`}>
                  <Col>
                    <Rate value={r} />
                  </Col>
                  <Col>
                    <Row style={{ padding: '0px 10px 0px 0px' }}>
                      {cards
                        .filter(c => c.rank === r)
                        .map(card => {
                          // const cards = searchCard(event.uid, uid, r);
                          // const card = cards.length === 1 ? cards[0] : cards[0];
                          const character = getCharacter(card.character);
                          return (
                            <Col key={card.character}>
                              「
                              <Button
                                type="link"
                                style={{ whiteSpace: 'unset', padding: 0 }}
                                onClick={() => toCard(props.history, card.uid)}
                              >
                                {card.name}
                              </Button>
                              」
                              <br />
                              <span>{character ? character.name : card.character}</span>
                            </Col>
                          );
                        })}
                    </Row>
                  </Col>
                </Row>
              ))
          )}
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Scout;
