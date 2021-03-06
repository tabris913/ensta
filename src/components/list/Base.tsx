import * as React from 'react';
import { Button, Collapse, List, Modal, Typography } from 'antd';
import * as R from 'ramda';

import PageName, { toPublicUrl } from '../../constants/PageName';
import { PageTitle } from '../../constants/PageTitle';
import Wireframe from '../../containers/wireframe/Wireframe';
import { IContent, IContentAdditionalState } from '../../models/content';
import { EventType, ListComponentProps, QueryType, ScoutType } from '../../models/Main';
import { toCard } from '../../utils/CardUtils';
import { toCharacter } from '../../utils/CharacterUtils';
import { toEvent } from '../../utils/EventUtils';
import { toScout } from '../../utils/ScoutUtils';
import { toSpecial } from '../../utils/SpecialUtils';
import { toUnitCollection } from '../../utils/UCUtils';
import { toUnit } from '../../utils/UnitUtils';

const ListGenerator = <T extends IContent, A extends IContentAdditionalState>({
  descriptions: Descriptions,
  filter = list => (list ? list : []),
  selector: Selector,
  ...props
}: ListComponentProps<T, A>) => {
  const [visible, setVisible] = React.useState(false);
  const [localState, setLocalState] = React.useState<QueryType>(R.omit([''], props.query));

  React.useState(() => {
    switch (props.contentName) {
      case 'event':
        if (!props.contents || !props.contents.event.list || props.contents.event.type !== props.match.params.type) {
          props.getList({ type: props.match.params.type as EventType, contentName: 'event' });
        }
        break;
      default:
        if (!props.contents || !props.contents[props.contentName].list) {
          props.getList({ contentName: props.contentName });
        }
    }
  });

  const handleName = (content: T) => {
    props.saveContent({ content: content, contentName: props.contentName });
    switch (props.contentName) {
      case 'event':
        switch (props.match.params.type as EventType) {
          case 'special':
            toSpecial(props.history, content.uid);
            break;
          case 'uc':
            toUnitCollection(props.history, content.uid);
            break;
          default:
            toEvent(props.history, content.uid);
        }
        break;
      case 'scout':
        toScout(props.history, content.uid, props.match.params.type as ScoutType);
        break;
      case 'unit':
        toUnit(props.history, content.uid);
        break;
      case 'character':
        toCharacter(props.history, content.uid);
        break;
      case 'card':
        toCard(props.history, content.uid);
    }
  };

  const pageTitle = PageTitle[props.contentName];

  return props.contents ? (
    <Wireframe title={pageTitle} breadcrump={[{ label: pageTitle }]}>
      {Selector ? (
        <>
          <Button style={{ width: 150, margin: 5 }} onClick={() => setVisible(true)}>
            検索条件を指定する
          </Button>
          <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={() => {
              setVisible(false);
              switch (props.contentName) {
                case 'card':
                  props.history.replace(
                    R.any(v => v !== undefined, R.values(localState))
                      ? toPublicUrl(PageName.CARD_LIST, undefined, localState)
                      : toPublicUrl(PageName.CARD_LIST)
                  );
                  break;
              }
            }}
            destroyOnClose={true}
            title="検索条件"
          >
            <Selector localState={localState} setLocalState={setLocalState} />
          </Modal>
        </>
      ) : (
        undefined
      )}

      <List
        pagination={{
          pageSize: props.pageSize || 10,
          defaultCurrent: props.contents[props.contentName].listPage || 1,
          onChange: n => {
            window.scrollTo(0, 0);
            props.changeListPage(n);
          },
        }}
        itemLayout="vertical"
        dataSource={R.clone(filter(props.contents[props.contentName].list as any))}
        style={{ overflowY: 'auto', overflowX: 'visible' }}
        renderItem={(item: T, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${props.contents![props.contentName].listPage}`}
                header={props.headers && props.headers(item)}
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div onClick={() => handleName(item)} onTouchEnd={() => handleName(item)}>
                    {item.name}
                  </div>
                </Typography.Title>
                {Descriptions && <Descriptions item={item} />}
              </Collapse.Panel>
            </Collapse>
          ) : (
            undefined
          )
        }
      />
      <Button onClick={props.history.goBack} type="primary">
        戻る
      </Button>
    </Wireframe>
  ) : (
    <></>
  );
};

export default ListGenerator;
