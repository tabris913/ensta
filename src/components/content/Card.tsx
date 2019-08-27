import { Button, Descriptions } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICard } from '../../models/card';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { MainContentProps } from '../../models/Main';

interface Props extends MainContentProps<ICard> {
  event?: INormalEvent | IUnitCollection | ISpecialEvent;
}

const Card = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.card.content || props.contents.card.content.uid !== props.query.id) {
      props.getContent({ uid: props.query.id!, contentName: 'card' });
    }
  });
  return props.contents && props.contents.card.content ? (
    <>
      <img
        src={`./images/${props.query.type || 'event'}/${props.contents.card.content.img}`}
        alt=""
        style={{ padding: 0, maxWidth: 280, width: '100%' }}
      />
      <Descriptions
        title="Event Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        {}
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  ) : (
    <></>
  );
};

export default Card;
