import { List } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
import { MainContentProps, TypeType } from '../../models/Main';
import { IScout } from '../../models/scout';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import { toEvent } from '../../utils/EventUtils';
import { isScout, toScout } from '../../utils/ScoutUtils';
import { toSpecial } from '../../utils/SpecialUtils';
import { toUnitCollection } from '../../utils/UCUtils';

interface Props extends MainContentProps<ICharacter> {}

const CharacterHistory = (props: Props) => {
  React.useState(() => {
    if (
      !props.contents ||
      !props.contents.character.content ||
      props.contents.character.content.uid !== props.match.params.id
    ) {
      props.getContent({ uid: props.match.params.id, contentName: 'character' });
      if (props.getHistory) props.getHistory({ uid: props.match.params.id, contentName: 'character' });
    }
  });

  const content = props.contents && props.contents.character.content;

  if (!content) return <></>;

  const additional: ICharacterAdditionalState = {
    event: [],
    scout: [],
    card: [],
    history: R.path(['contents', 'character', 'additional', 'history'], props) || [],
  };

  return (
    <>
      ここにドロップダウンでフィルタ
      <List
        dataSource={additional.history}
        renderItem={(item, idx) => {
          if (!item) return undefined;

          let contentType: 'event' | 'scout' | undefined;
          let subDirectory: TypeType | 'event' | 'scout' | undefined;
          if (item.uid.startsWith('e')) {
            contentType = 'event';
            subDirectory = 'event';
          } else if (item.uid.startsWith('sp')) {
            contentType = 'event';
            subDirectory = 'special';
          } else if (item.uid.startsWith('uc')) {
            contentType = 'event';
            subDirectory = 'uc';
          } else if (isScout(item)) {
            contentType = 'scout';
            subDirectory = item.type || 'scout';
          }

          if (!contentType || !subDirectory) return undefined;

          return (
            <div>
              <img
                src={`./images/${subDirectory}/${item.img}`}
                alt={item.name}
                style={{ padding: 0, maxWidth: 280, width: '100%', minHeight: 50 }}
                onClick={() => {
                  switch (subDirectory) {
                    case 'event':
                      toEvent(props.history, item.uid);
                      break;
                    case 'special':
                      toSpecial(props.history, item.uid);
                      break;
                    case 'uc':
                      toUnitCollection(props.history, item.uid);
                      break;
                    default:
                      toScout(props.history, item.uid, (item as IScout).type);
                  }
                }}
              />
            </div>
          );
        }}
        itemLayout="vertical"
        style={{ overflowY: 'auto', overflowX: 'visible' }}
      />
    </>
  );
};

export default CharacterHistory;
