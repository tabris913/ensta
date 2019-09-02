import { Button, Col, Descriptions, Row, Typography } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
import { MainContentProps } from '../../models/Main';
import { IContentRequest } from '../../models/request/ContentRequest';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import { toEvent } from '../../utils/EventUtils';
import { toScout } from '../../utils/ScoutUtils';
import { getUnits, toUnit } from '../../utils/UnitUtils';

interface Props extends MainContentProps<ICharacter> {
  getHistory?: (req: IContentRequest) => void;
}

const Character = (props: Props) => {
  React.useState(() => {
    if (
      !props.contents ||
      !props.contents.character.content ||
      props.contents.character.content.uid !== props.match.params.id
    ) {
      props.getContent({ uid: props.match.params.id, contentName: 'character' });
    }
  });

  const content = props.contents && props.contents.character.content;

  if (!content) return <></>;

  const additional: ICharacterAdditionalState = {
    event: R.path(['contents', 'character', 'additional', 'event'], props) || [],
    scout: R.path(['contents', 'character', 'additional', 'scout'], props) || [],
    card: R.path(['contents', 'character', 'additional', 'card'], props) || [],
    history: [],
  };
  const latestEventUid = R.last(additional.event).uid;
  const latestRankingEvent = R.last(additional.event.filter(e => e.bonus.ranking['5'].includes(content.uid)));
  const latestPointEvent = R.last(additional.event.filter(e => e.bonus.point['5'].includes(content.uid)));
  const latestScout = R.last(additional.scout);

  const unit = getUnits().filter(u => u.member.includes(props.match.params.id));

  return (
    <>
      <div style={{ height: '100%', overflowY: 'auto', marginBottom: 5 }}>
        <img src={content.imgs[0]} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
        <Descriptions title="Character Info" column={{ xs: 1, md: 2 }} bordered={true} layout="vertical" size="small">
          <Descriptions.Item label="キャッチフレーズ" span={2}>
            {content.catchPhrase}
          </Descriptions.Item>
          <Descriptions.Item label="誕生日">{content.birthday}</Descriptions.Item>
          <Descriptions.Item label="血液型">{content.bloodType}</Descriptions.Item>
          <Descriptions.Item label="身長">{content.height}</Descriptions.Item>
          <Descriptions.Item label="体重">{content.weight}</Descriptions.Item>
          {R.isEmpty(content.unit) ? (
            undefined
          ) : (
            <Descriptions.Item label="所属ユニット">
              <Row>
                {unit.map((u, idx) => (
                  <Col key={idx}>
                    <Button
                      type="link"
                      onClick={() => toUnit(props.history, u!.uid)}
                      style={{ whiteSpace: 'unset', padding: 0 }}
                      key={idx}
                    >
                      {u!.name}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Descriptions.Item>
          )}
          {content.club ? <Descriptions.Item label="部活">{content.club}</Descriptions.Item> : undefined}

          <Descriptions.Item label="最新☆5イベント">
            <Row>
              {latestRankingEvent ? (
                <>
                  <Col>
                    <Typography.Text strong={true}>
                      ランキングボーナス {latestEventUid === latestRankingEvent.uid ? '(最新)' : ''}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => toEvent(props.history, latestRankingEvent.uid)}
                      type="link"
                      style={{ whiteSpace: 'unset', padding: 0 }}
                    >
                      {latestRankingEvent ? (
                        <img
                          src={latestRankingEvent.img}
                          alt={latestRankingEvent.name}
                          style={{ padding: 0, maxWidth: 280, width: '100%', verticalAlign: 'unset' }}
                        />
                      ) : (
                        'not yet'
                      )}
                    </Button>
                  </Col>
                </>
              ) : (
                undefined
              )}
              {latestPointEvent ? (
                <>
                  <Col>
                    <Typography.Text strong={true}>
                      ポイントボーナス {latestEventUid === latestPointEvent.uid ? '(最新)' : ''}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => toEvent(props.history, latestPointEvent.uid)}
                      type="link"
                      style={{ whiteSpace: 'unset', padding: 0 }}
                    >
                      {latestPointEvent ? (
                        <img
                          src={latestPointEvent.img}
                          alt={latestPointEvent.name}
                          style={{ padding: 0, maxWidth: 280, width: '100%', verticalAlign: 'unset' }}
                        />
                      ) : (
                        'not yet'
                      )}
                    </Button>
                  </Col>
                </>
              ) : (
                undefined
              )}
              <Col style={{ marginTop: 10 }}>
                <Button
                  type="link"
                  style={{ whiteSpace: 'unset', padding: 0 }}
                  onClick={() => {
                    if (props.getHistory) props.getHistory({ contentName: 'character', uid: props.match.params.id });
                    props.history.push(
                      toPublicUrl(PageName.CHARACTER_HISTORY, [props.match.params.id], { kind: 'event' })
                    );
                  }}
                >
                  その他のイベントを見る
                </Button>
              </Col>
            </Row>
          </Descriptions.Item>
          {latestScout ? (
            <Descriptions.Item label="最新☆5スカウト">
              <Row>
                <Col>
                  <Button
                    onClick={() => toScout(props.history, latestScout.uid)}
                    type="link"
                    style={{ whiteSpace: 'unset', padding: 0 }}
                  >
                    {latestScout ? (
                      <img
                        src={latestScout.img}
                        alt={latestScout.name}
                        style={{ padding: 0, maxWidth: 280, width: '100%', verticalAlign: 'unset' }}
                      />
                    ) : (
                      'not yet'
                    )}
                  </Button>
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <Button
                    type="link"
                    style={{ whiteSpace: 'unset', padding: 0 }}
                    onClick={() => {
                      if (props.getHistory) props.getHistory({ contentName: 'character', uid: props.match.params.id });
                      props.history.push(
                        toPublicUrl(PageName.CHARACTER_HISTORY, [props.match.params.id], { kind: 'scout' })
                      );
                    }}
                  >
                    その他のスカウトを見る
                  </Button>
                </Col>
              </Row>
            </Descriptions.Item>
          ) : (
            undefined
          )}
        </Descriptions>
        <Button
          style={{ marginTop: 5 }}
          onClick={() => {
            if (props.getHistory) props.getHistory({ contentName: 'character', uid: props.match.params.id });
            props.history.push(toPublicUrl(PageName.CHARACTER_HISTORY, [props.match.params.id]));
          }}
        >
          イベント・スカウト履歴
        </Button>
        <Button
          style={{ marginTop: 5 }}
          onClick={() => {
            props.history.push(toPublicUrl(PageName.CARD_LIST, undefined, { id: props.match.params.id }));
          }}
        >
          カード一覧
        </Button>
      </div>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  );
};

export default Character;
