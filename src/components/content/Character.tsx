import { Button, Col, Descriptions, Row } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
import { INormalEvent } from '../../models/event';
import { MainContentProps } from '../../models/Main';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import { toEvent } from '../../utils/EventUtils';
import { toScout } from '../../utils/ScoutUtils';
import { getUnit, toUnit } from '../../utils/UnitUtils';

interface Props extends MainContentProps<ICharacter> {}

const Character = (props: Props) => {
  React.useState(() => {
    if (
      !props.contents ||
      !props.contents.character.content ||
      props.contents.character.content.uid !== props.query.id
    ) {
      props.getContent({ uid: props.query.id!, contentName: 'character' });
    }
  });

  const content = props.contents && props.contents.character.content;
  const additional: ICharacterAdditionalState = {
    event: R.path(['contents', 'character', 'additional', 'event'], props) || [],
    scout: R.path(['contents', 'character', 'additional', 'scout'], props) || [],
    card: R.path(['contents', 'character', 'additional', 'card'], props) || [],
  };
  const latestEvent = R.last(additional.event);
  const latestScout = R.last(additional.scout);

  return content ? (
    <>
      <img src={`./images/character/${content.imgs[0]}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <Descriptions
        title="Character Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item
          label={
            <span>
              キャッチ
              <br />
              フレーズ
            </span>
          }
        >
          {content.catchPhrase}
        </Descriptions.Item>
        <Descriptions.Item label="誕生日">{content.birthday}</Descriptions.Item>
        <Descriptions.Item label="身長">{content.height}</Descriptions.Item>
        <Descriptions.Item label="体重">{content.weight}</Descriptions.Item>
        <Descriptions.Item label="血液型">{content.bloodType}</Descriptions.Item>
        {R.isEmpty(content.unit) ? (
          undefined
        ) : (
          <Descriptions.Item label="所属ユニット">
            {content.unit.map(getUnit).map((u, idx) => (
              <Button
                type="link"
                onClick={() => toUnit(props.history, u!.uid)}
                style={{ whiteSpace: 'unset', padding: 0 }}
                key={idx}
              >
                {u!.name}
              </Button>
            ))}
          </Descriptions.Item>
        )}
        {content.club ? <Descriptions.Item label="部活">{content.club}</Descriptions.Item> : undefined}
        <Descriptions.Item
          label={
            <span>
              最新☆5
              <br />
              イベント
            </span>
          }
        >
          <Row>
            <Col>
              <Button
                onClick={() => toEvent(props.history, latestEvent.uid)}
                type="link"
                style={{ whiteSpace: 'unset', padding: 0 }}
              >
                {latestEvent ? latestEvent.name : 'not yet'}
              </Button>
              {latestEvent
                ? ` (${(latestEvent as INormalEvent).bonus.point['5'].includes(content.uid) ? 'ポイボ' : 'ランボ'})`
                : ''}
            </Col>
            <Col style={{ marginTop: 10 }}>その他を見る</Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              最新☆5
              <br />
              スカウト
            </span>
          }
        >
          <Button
            onClick={() => toScout(props.history, latestScout.uid)}
            type="link"
            style={{ whiteSpace: 'unset', padding: 0 }}
          >
            {latestScout ? latestScout.name : 'not yet'}
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        リストに戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Character;
