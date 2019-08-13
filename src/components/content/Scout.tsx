import { Button, Col, Descriptions, Row } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { getCharacter } from '../../utils/CharacterUtils';
import { getScout } from '../../utils/ScoutUtils';

const Scout = (props: MainContentProps) => {
  const scout = getScout(props.query.id!);
  return scout ? (
    <>
      <img src={`./images/scout/${scout.img}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <p>{scout.description}</p>
      <Descriptions
        title="Scout Info"
        column={{ xs: 1, md: 3 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{scout.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{scout.end}</Descriptions.Item>
        <Descriptions.Item label="排出カード">
          {['5', '4', '3'].map(r =>
            Object.keys(scout.cards).includes(r) ? (
              <Row type="flex" key={`cards.${r}`}>
                <Col>{r}</Col>
                <Col style={{ margin: '0 4px' }}>:</Col>
                <Col>
                  <Row style={{ padding: '0px 10px 0px 0px' }}>
                    {scout.cards[r].map((uid: string) => (
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
