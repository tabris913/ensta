import { Button, Col, Descriptions, Row } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { EventType, MainContentProps } from '../../models/Main';
import { searchCard } from '../../utils/CardUtils';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent, isEvent, isNormalEvent } from '../../utils/EventUtils';
import { isUnitCollection } from '../../utils/UCUtils';

interface Props extends MainContentProps<INormalEvent | ISpecialEvent | IUnitCollection> {}

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

const Event = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.event.content) {
      props.getContent({ uid: props.query.id!, type: props.query.type as EventType, contentName: 'event' });
    }
  });

  return props.contents && isEvent(props.contents.event.content) ? (
    <>
      <img
        src={`./images/${props.query.type || 'event'}/${props.contents.event.content.img}`}
        alt=""
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
      <p>{props.contents.event.content.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{props.contents.event.content.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{props.contents.event.content.end}</Descriptions.Item>
        {isNormalEvent(props.contents.event.content) ? (
          <Descriptions.Item label="ランキング">
            <EventBonus event={props.contents.event.content} property="ranking" />
          </Descriptions.Item>
        ) : null}
        {isNormalEvent(props.contents.event.content) ? (
          <Descriptions.Item label="ポイント">
            <EventBonus event={props.contents.event.content} property="point" />
          </Descriptions.Item>
        ) : null}
        {isUnitCollection(props.contents.event.content) ? (
          <Descriptions.Item label="獲得カード">
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {props.contents.event.content.acquirableCards.map((uid: string) => {
                const cards = searchCard(props.contents!.event.content.uid, uid, '5');
                const card = cards.length === 1 ? cards[0] : cards[0];
                const character = card ? getCharacter(card.character) : '';
                return (
                  <Col key={uid}>{card ? `「${card.name}」 ${character ? character.name : card.character}` : uid}</Col>
                );
              })}
            </Row>
          </Descriptions.Item>
        ) : null}
        {isUnitCollection(props.contents.event.content) ? (
          <Descriptions.Item label="過去イベント">
            <Row style={{ padding: '0px 10px 0px 0px' }}>
              {props.contents.event.content.revivalEvents.map((uid: string) => {
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

export default Event;
