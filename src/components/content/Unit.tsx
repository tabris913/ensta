import { Button, Col, Descriptions, Row } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { IUnit } from '../../models/unit';
import { getCharacter, toCharacter } from '../../utils/CharacterUtils';

interface Props extends MainContentProps<IUnit> {}

const Unit = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.unit.content || props.contents.unit.content.uid !== props.match.params.id) {
      props.getContent({ uid: props.match.params.id, contentName: 'unit' });
    }
  });

  const content = props.contents && props.contents.unit.content;

  return content ? (
    <>
      {content.logo ? (
        <img src={`./images/unit/${content.logo}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      ) : (
        undefined
      )}
      <p>{content.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="メンバー">
          <Row>
            {content.member.map((uid, idx) => (
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
        {content.color ? <Descriptions.Item label="テーマカラー">{content.color}</Descriptions.Item> : <></>}
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
