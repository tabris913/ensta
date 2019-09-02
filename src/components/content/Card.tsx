import { Button, Descriptions, Rate } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICard } from '../../models/card';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../../models/event';
import { MainContentProps } from '../../models/Main';
import { getCharacter } from '../../utils/CharacterUtils';
import { getEvent, isEventUid } from '../../utils/EventUtils';
import { getScout, isScoutUid } from '../../utils/ScoutUtils';
import { getSpecial, isSpecialUid } from '../../utils/SpecialUtils';
import { getUnitCollection, isUnitCollectionUid } from '../../utils/UCUtils';

interface Props extends MainContentProps<ICard> {
  event?: INormalEvent | IUnitCollection | ISpecialEvent;
}

const Card = (props: Props) => {
  React.useState(() => {
    if (!props.contents || !props.contents.card.content || props.contents.card.content.uid !== props.match.params.id) {
      props.getContent({ uid: props.match.params.id, contentName: 'card' });
    }
  });

  const content = props.contents && props.contents.card.content;

  if (!content) return <></>;
  const character = getCharacter(content.character);

  return (
    <>
      <img src={`./images/card/${content.img[0]}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      <img src={`./images/card/${content.img[1]}`} alt="" style={{ padding: 0, maxWidth: 280, width: '100%' }} />
      「画像は、未だ無ひ。」
      <Descriptions
        title="Card Info"
        column={{ xs: 1, md: 2 }}
        style={{ height: '100%', overflowY: 'auto' }}
        bordered={true}
      >
        <Descriptions.Item label="キャラクター">{character ? character.name : content.character}</Descriptions.Item>
        <Descriptions.Item label="レアリティ">
          <Rate value={content.rank} style={{ fontSize: 18 }} />
        </Descriptions.Item>
        <Descriptions.Item label="種別">
          <span style={{ color: content.type === 'Da' ? 'red' : content.type === 'Vo' ? 'blue' : 'orange' }}>
            {content.type}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="コンテンツ">
          {content.content.map((e, idx) => {
            let name;
            let link: any;
            switch (e) {
              case '':
                name = content.remarks;
                break;
              case 'normal':
                name = '恒常';
                break;
              default:
                if (isScoutUid(e)) {
                  const scout = getScout(e);
                  if (scout) name = scout.name;
                  link = toPublicUrl(PageName.SCOUT, [e]);
                } else if (isEventUid(e)) {
                  const event = getEvent(e);
                  if (event) name = event.name;
                  link = toPublicUrl(PageName.EVENT, [e]);
                } else if (isSpecialUid(e)) {
                  const event = getSpecial(e);
                  if (event) name = event.name;
                  link = toPublicUrl(PageName.EVENT, [e]);
                } else if (isUnitCollectionUid(e)) {
                  const event = getUnitCollection(e);
                  if (event) name = event.name;
                  link = toPublicUrl(PageName.EVENT, [e]);
                } else name = '不明';
            }
            return link ? (
              <Button
                key={idx}
                type="link"
                style={{ whiteSpace: 'unset', padding: 0 }}
                onClick={() => props.history.push(link)}
              >
                {name}
              </Button>
            ) : (
              <span>{name}</span>
            );
          })}
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  );
};

export default Card;
