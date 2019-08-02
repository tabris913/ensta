import { Button, Col, Row } from 'antd';
import * as React from 'react';

import PageName, { toPublicUrl } from '../../constants/PageName';
import { MainContentProps } from '../../models/Main';

const Top = (props: MainContentProps) => {
  const topButtons = [
    { label: 'Event', linkto: PageName.UNDEFINED },
    { label: 'Scout' },
    { label: 'Unit' },
    { label: 'Character' },
    { label: 'Card' },
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
