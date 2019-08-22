import { Button, Col, Descriptions, Row } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';
import { IUnit } from '../../models/unit';
import { getCharacter, toCharacter } from '../../utils/CharacterUtils';
import { isUnit } from '../../utils/UnitUtils';

interface Props extends MainContentProps<IUnit> {}

const Unit = ({ content: unit, ...props }: Props) =>
  isUnit(unit) ? (
    <>
      {unit.logo ? (
        <img src={`./images/unit/${unit.logo}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      ) : (
        undefined
      )}
      <p>{unit.description}</p>
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="メンバー">
          <Row>
            {unit.member.map((uid, idx) => (
              <Col key={idx}>
                <Button type="link" onClick={() => toCharacter(props.history, uid)}>
                  {getCharacter(uid)!.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Descriptions.Item>
        {unit.color ? <Descriptions.Item label="テーマカラー">{unit.color}</Descriptions.Item> : <></>}
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

export default Unit;
