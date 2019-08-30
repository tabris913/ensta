import { Button, Col, Descriptions, Row } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { IScout } from '../../models/scout';
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
  return props.contents && props.contents.scout.content ? (
    <>
      <img
        src={`./images/scout/${props.contents.scout.content.img}`}
        alt=""
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
      <p>{props.contents.scout.content.description}</p>
      <Descriptions
        title="Scout Info"
        column={{ xs: 1, md: 3 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="開始">{props.contents.scout.content.start}</Descriptions.Item>
        <Descriptions.Item label="終了">{props.contents.scout.content.end}</Descriptions.Item>
        <Descriptions.Item label="排出カード">
          {['5', '4', '3'].map(r =>
            Object.keys(props.contents!.scout.content!.cards).includes(r) ? (
              <Row type="flex" key={`cards.${r}`}>
                <Col>{r}</Col>
                <Col style={{ margin: '0 4px' }}>:</Col>
                <Col>
                  <Row style={{ padding: '0px 10px 0px 0px' }}>
                    {props.contents!.scout.content!.cards[r].map((uid: string) => (
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
