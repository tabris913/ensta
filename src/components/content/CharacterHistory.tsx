import { Button, Col, List, Row, Select } from 'antd';
import * as R from 'ramda';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import { ICharacter } from '../../models/character';
import { IEvent } from '../../models/event';
import { MainContentProps, TypeType } from '../../models/Main';
import { IScout } from '../../models/scout';
import { ICharacterAdditionalState } from '../../reducers/contents/character';
import { toEvent } from '../../utils/EventUtils';
import { isScout, toScout } from '../../utils/ScoutUtils';
import { toSpecial } from '../../utils/SpecialUtils';
import { toUnitCollection } from '../../utils/UCUtils';

interface Props extends MainContentProps<ICharacter> {}

interface ISelect {
  kind: 'all' | 'event' | 'scout';
  rarelity: 5 | 4 | 3 | 'all';
}

const kindFilter = (item: IEvent | IScout, select: ISelect, id: string) => {
  switch (select.kind) {
    case 'all':
      return true;
    case 'scout':
      return isScout(item);
    default:
      return !isScout(item);
  }
};

const CharacterHistory = (props: Props) => {
  const [select, setSelect] = React.useState<ISelect>({ kind: 'all', rarelity: 'all' });

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
      <Row type="flex">
        <Col xs={5}>種類:</Col>
        <Col xs={19}>
          <Select
            defaultValue="all"
            style={{ width: 150, margin: 5 }}
            onChange={(e: 'all' | 'event' | 'scout') => setSelect({ ...select, kind: e })}
          >
            <Select.Option value="all">すべて</Select.Option>
            <Select.Option value="event">イベント</Select.Option>
            <Select.Option value="scout">スカウト</Select.Option>
          </Select>
        </Col>
        <Col xs={5}>レアリティ:</Col>
        <Col xs={19}>
          <Select
            defaultValue="all"
            style={{ width: 150, margin: 5 }}
            onChange={(e: 5 | 4 | 3 | 'all') => setSelect({ ...select, rarelity: e })}
          >
            <Select.Option value="all">すべて</Select.Option>
            <Select.Option value={5}>☆☆☆☆☆</Select.Option>
            <Select.Option value={4}>☆☆☆☆</Select.Option>
            <Select.Option value={3}>☆☆☆</Select.Option>
          </Select>
        </Col>
      </Row>

      <List
        dataSource={additional.history
          .filter(h => kindFilter(h.content, select, props.match.params.id))
          .filter(h => select.rarelity === 'all' || select.rarelity === h.rarelity)}
        renderItem={(history, idx) => {
          const item = history.content;
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
            subDirectory = item.type;
          }

          if (!contentType || !subDirectory) return undefined;

          return (
            <div>
              <img
                src={item.img}
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
      <Button onClick={props.history.goBack} type="primary" style={{ width: 'unset' }}>
        戻る
      </Button>
    </>
  );
};

export default CharacterHistory;
