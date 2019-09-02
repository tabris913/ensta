import { Button, Col, Descriptions, Divider, Rate, Row } from 'antd';
import { History } from 'history';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICard } from '../../models/card';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { EventType, MainContentProps } from '../../models/Main';
import { toCard } from '../../utils/CardUtils';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent, isNormalEvent } from '../../utils/EventUtils';
import { isSpecialUid } from '../../utils/SpecialUtils';
import { isUnitCollection } from '../../utils/UCUtils';

interface Props extends MainContentProps<INormalEvent | ISpecialEvent | IUnitCollection> {}

const EventBonus = ({
  history,
  property,
  cards: bonusCards,
}: {
  history: History;
  property: string;
  cards: ICard[];
}) => (
  <>
    {R.intersperse(
      <Divider style={{ margin: 0 }} />,
      [5, 4, 3]
        .filter(r => !R.isEmpty(bonusCards.filter(c => c.rank === r)))
        .map(r => (
          <Row key={`${property}Bonus.${r}`}>
            <Col>
              <Rate value={r} />
            </Col>
            <Col>
              <Row style={{ padding: '0px 10px 0px 0px' }}>
                {bonusCards
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
                          onClick={() => toCard(history, card.uid)}
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
  </>
);

const Event = (props: Props) => {
  React.useState(() => {
    if (
      !props.contents ||
      !props.contents.event.content ||
      props.contents.event.content.uid !== props.match.params.id
    ) {
      props.getContent({ uid: props.match.params.id, type: props.query.type as EventType, contentName: 'event' });
    }
  });

  const content = props.contents && props.contents.event.content;

  const bonusCards = (props.contents && props.contents.event.additional && props.contents.event.additional.card) || [];

  return content ? (
    <>
      <img src={content.img} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <p>{content.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{content.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{content.end}</Descriptions.Item>
        {(isNormalEvent(content) || isSpecialUid(content.uid)) &&
        !R.isEmpty(bonusCards.filter(c => c.bonus === 'ranking')) ? (
          <Descriptions.Item label="ランキング">
            <EventBonus
              property="ranking"
              history={props.history}
              cards={bonusCards.filter(c => c.bonus === 'ranking')}
            />
          </Descriptions.Item>
        ) : null}
        {(isNormalEvent(content) || isSpecialUid(content.uid)) &&
        !R.isEmpty(bonusCards.filter(c => c.bonus === 'point')) ? (
          <Descriptions.Item label="ポイント">
            <EventBonus property="point" history={props.history} cards={bonusCards.filter(c => c.bonus === 'point')} />
          </Descriptions.Item>
        ) : null}
        {(isUnitCollection(content) || isSpecialUid(content.uid)) &&
        !R.isEmpty(bonusCards.filter(c => c.bonus === '')) ? (
          // <Descriptions.Item label="獲得カード">
          //   <Row style={{ padding: '0px 10px 0px 0px' }}>
          //     {bonusCards
          //       .filter(c => c.bonus === '')
          //       .map(card => {
          //         const character = getCharacter(card.character);
          //         return <Col key={card.uid}>{`「${card.name}」 ${character ? character.name : card.character}`}</Col>;
          //       })}
          //   </Row>
          // </Descriptions.Item>
          <Descriptions.Item label="獲得カード">
            <EventBonus property="acquirable" history={props.history} cards={bonusCards.filter(c => c.bonus === '')} />
          </Descriptions.Item>
        ) : null}
        {isUnitCollection(content) ? (
          <Descriptions.Item label="過去イベント">
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {content.revivalEvents.map((uid: string) => {
                const pastEvent = getEvent(uid);
                return <Col key={uid}>{pastEvent ? pastEvent.name : uid}</Col>;
              })}
            </Row>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Event;
