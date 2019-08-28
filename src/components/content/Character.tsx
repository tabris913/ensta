import { Button, Col, Descriptions, Row, Typography } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
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

  if (!content) return <></>;

  const additional: ICharacterAdditionalState = {
    event: R.path(['contents', 'character', 'additional', 'event'], props) || [],
    scout: R.path(['contents', 'character', 'additional', 'scout'], props) || [],
    card: R.path(['contents', 'character', 'additional', 'card'], props) || [],
  };
  const latestEventUid = R.last(additional.event).uid;
  const latestRankingEvent = R.last(additional.event.filter(e => e.bonus.ranking['5'].includes(content.uid)));
  const latestPointEvent = R.last(additional.event.filter(e => e.bonus.point['5'].includes(content.uid)));
  const latestScout = R.last(additional.scout);

  return (
    <>
      <img src={`./images/character/${content.imgs[0]}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <Descriptions
        title="Character Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
        layout="vertical"
      >
        <Descriptions.Item label="キャッチフレーズ">{content.catchPhrase}</Descriptions.Item>
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
        <Descriptions.Item label="最新☆5イベント (色が濃いのが最新)">
          <Row>
            <Col>
              <Typography.Text strong={true}>ランキング</Typography.Text>
            </Col>
            <Col>
              <Button
                onClick={() => toEvent(props.history, latestRankingEvent.uid)}
                type="link"
                style={
                  latestEventUid === latestRankingEvent.uid
                    ? {
                        whiteSpace: 'unset',
                        padding: 0,
                        color: 'blue',
                      }
                    : { whiteSpace: 'unset', padding: 0 }
                }
              >
                {latestRankingEvent ? latestRankingEvent.name : 'not yet'}
              </Button>
            </Col>
            <Col>
              <Typography.Text strong={true}>ポイント</Typography.Text>
            </Col>
            <Col>
              <Button
                onClick={() => toEvent(props.history, latestPointEvent.uid)}
                type="link"
                style={
                  latestEventUid === latestPointEvent.uid
                    ? {
                        whiteSpace: 'unset',
                        padding: 0,
                        color: 'blue',
                      }
                    : { whiteSpace: 'unset', padding: 0 }
                }
              >
                {latestPointEvent ? latestPointEvent.name : 'not yet'}
              </Button>
            </Col>
            <Col style={{ marginTop: 10 }}>その他を見る</Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="最新☆5スカウト">
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
  );
};

export default Character;
