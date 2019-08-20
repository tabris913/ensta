import { Button, Collapse, List, Typography } from 'antd';
import * as React from 'react';

// import PageName, { toPublicUrl } from '../../constants/PageName';
import PageName, { toPublicUrl } from '../../constants/PageName';
import { ListComponentProps } from '../../models/Main';
import { IUnit } from '../../models/unit';
import { getUnit, unitIds } from '../../utils/UnitUtils';

const Unit = (props: ListComponentProps<IUnit>) => {
  const unit = unitIds.map(getUnit);
  const [pageKey, setPageKey] = React.useState(0);

  return (
    <>
      <List
        pagination={{
          pageSize: 14,
          onChange: () => {
            window.scrollTo(0, 0); // 効いてない
            setPageKey(pageKey + 1);
          },
        }}
        itemLayout="vertical"
        dataSource={unit}
        renderItem={(item, idx) =>
          !!item ? (
            <Collapse style={{ width: '100%' }}>
              <Collapse.Panel
                key={`${idx}.${pageKey}`}
                header={
                  <img
                    src={`./images/unit/${item.logo}`}
                    alt={item.name}
                    style={{ padding: 0, maxWidth: 280, width: '100%' }}
                  />
                }
                showArrow={false}
              >
                <Typography.Title level={4} style={{ width: '100%' }} underline={true}>
                  <div
                    onClick={() => props.history.push(toPublicUrl(PageName.UNIT, undefined, { id: item.uid }))}
                    onTouchEnd={() => props.history.push(toPublicUrl(PageName.UNIT, undefined, { id: item.uid }))}
                  >
                    {item.name}
                  </div>
                </Typography.Title>
                <p>{item.description_short}</p>
              </Collapse.Panel>
            </Collapse>
          ) : (
            undefined
          )
        }
        style={{ overflowY: 'auto', overflowX: 'visible' }}
      />
      <Button
        onClick={() => {
          props.history.goBack();
          props.history.replace(toPublicUrl(PageName.TOP));
        }}
        type="primary"
      >
        TOPに戻る
      </Button>
    </>
  );
};

export default Unit;
