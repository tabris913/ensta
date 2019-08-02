import { Button, Col, Row } from 'antd';
import * as React from 'react';

import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';

const Top = (props: MainContentProps) => {
  const topButtons = [
    { label: 'Event', linkto: PageName.EVENT_LIST },
    { label: 'Scout', linkto: PageName.SCOUT_LIST },
    { label: 'Unit', linkto: PageName.UNIT_LIST },
    { label: 'Character', linkto: PageName.CHARACTER_LIST },
    { label: 'Card', linkto: PageName.CARD_LIST },
  ];
  return (
    <Row>
      {topButtons.map(({ label, linkto }, idx) => (
        <Col style={{ padding: 5 }} key={idx}>
          <Button
            type="link"
            style={{ fontSize: 30 }}
            onClick={() => props.history.push(toPublicUrl(linkto || PageName.UNDEFINED))}
          >
            {label}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default Top;
