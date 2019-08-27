import { Button, Col, Descriptions, Row } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICard } from '../../models/card';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { MainContentProps } from '../../models/Main';
import { getCard, searchCard } from '../../utils/CardUtils';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent, isNormalEvent } from '../../utils/EventUtils';
import { isUnitCollection } from '../../utils/UCUtils';

interface Props extends MainContentProps<ICard> {
  event?: INormalEvent | IUnitCollection | ISpecialEvent;
}

const EventBonus = ({ event, property }: { event: INormalEvent; property: string }) => (
  <>
    {['5', '4', '3']
      .filter(r => Object.keys(event.bonus[property]).includes(r) && !R.isEmpty(event.bonus[property][r]))
      .map(r => (
        <Row type="flex" key={`${property}Bonus.${r}`}>
          <Col>{r}</Col>
          <Col style={{ margin: '0 4px' }}>:</Col>
          <Col>
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {event.bonus[property][r].map((uid: string) => {
                const cards = searchCard(event.uid, uid, r);
                const card = cards.length === 1 ? cards[0] : cards[0];
                const character = getCharacter(uid);
                return (
                  <Col key={uid}>
                    「{card.name}」 {character ? character.name : uid}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      ))}
  </>
);

const Card = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.card.content) {
      props.getContent({ uid: props.query.id!, contentName: 'card' });
    }
  });
  return props.contents && props.contents.card.content ? (
    <>
      <img
        src={`./images/${props.query.type || 'event'}/${props.contents.card.content.img}`}
        alt=""
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
      <p>{props.contents.card.content.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{props.contents.card.content.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{props.contents.card.content.end}</Descriptions.Item>
        {isNormalEvent(props.contents.card.content) ? (
          <Descriptions.Item label="ランキング">
            <EventBonus event={props.contents.card.content} property="ranking" />
          </Descriptions.Item>
        ) : null}
        {isNormalEvent(props.contents.card.content) ? (
          <Descriptions.Item label="ポイント">
            <EventBonus event={props.contents.card.content} property="point" />
          </Descriptions.Item>
        ) : null}
        {isUnitCollection(props.contents.card.content) ? (
          <Descriptions.Item label="獲得カード">
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {props.contents.card.content.acquirableCards.map((uid: string) => {
                const card = getCard(uid);
                const character = card ? getCharacter(card.character) : '';
                return (
                  <Col key={uid}>{card ? `「${card.name}」 ${character ? character.name : card.character}` : uid}</Col>
                );
              })}
            </Row>
          </Descriptions.Item>
        ) : null}
        {isUnitCollection(props.contents.card.content) ? (
          <Descriptions.Item label="過去イベント">
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {props.contents.card.content.revivalEvents.map((uid: string) => {
                const pastEvent = getEvent(uid);
                return <Col key={uid}>{pastEvent ? pastEvent.name : uid}</Col>;
              })}
            </Row>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
      <Button
        onClick={() => {
          props.history.goBack();
          props.history.replace(
            toPublicUrl(PageName.EVENT_LIST, undefined, props.query.type ? { type: props.query.type } : {})
          );
        }}
        type="primary"
        style={{ width: 'unset' }}
      >
        リストに戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Card;
