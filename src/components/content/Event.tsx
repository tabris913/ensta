import { Col, Descriptions, Row, Button } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent } from '../../utils/EventUtils';

const Event = (props: MainContentProps) => {
  const event = getEvent(props.query.id!);
  return event ? (
    <>
      <img src={`./images/event/${event.img}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <p>{event.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 3 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{event.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{event.end}</Descriptions.Item>
        {event.bonus
          ? [{ label: 'ランキング', property: 'ranking' }, { property: 'point', label: 'ポイント' }].map(
              ({ property, label }) => (
                <Descriptions.Item label={label} key={property}>
                  {['5', '4', '3'].map(r =>
                    Object.keys(event.bonus![property]).includes(r) ? (
                      <Row type="flex" key={`${property}Bonus.${r}`}>
                        <Col>{r}</Col>
                        <Col style={{ margin: '0 4px' }}>:</Col>
                        <Col>
                          <Row style={{ padding: '0px 10px 0px 0px' }}>
                            {event.bonus![property][r].map((uid: string) => (
                              <Col key={uid}>{getCharacter(uid)!.name}</Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      undefined
                    )
                  )}
                </Descriptions.Item>
              )
            )
          : undefined}
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
