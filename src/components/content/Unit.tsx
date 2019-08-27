import { Button, Col, Descriptions, Row } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { IUnit } from '../../models/unit';
import { getCharacter, toCharacter } from '../../utils/CharacterUtils';
import { isUnit } from '../../utils/UnitUtils';

interface Props extends MainContentProps<IUnit> {}

const Unit = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.unit.content || props.contents.unit.content.uid !== props.query.id) {
      props.getContent({ uid: props.query.id!, contentName: 'unit' });
    }
  });

  return props.contents && isUnit(props.contents.unit.content) ? (
    <>
      {props.contents.unit.content.logo ? (
        <img
          src={`./images/unit/${props.contents.unit.content.logo}`}
          alt=""
          style={{ padding: 0, maxWidth: 280, width: '100%' }}
        />
      ) : (
        undefined
      )}
      <p>{props.contents.unit.content.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="メンバー">
          <Row>
            {props.contents.unit.content.member.map((uid, idx) => (
              <Col key={idx}>
                <Button
                  type="link"
                  onClick={() => toCharacter(props.history, uid)}
                  style={{ whiteSpace: 'unset', padding: 0 }}
                >
                  {getCharacter(uid)!.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Descriptions.Item>
        {props.contents.unit.content.color ? (
          <Descriptions.Item label="テーマカラー">{props.contents.unit.content.color}</Descriptions.Item>
        ) : (
          <></>
        )}
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Unit;
