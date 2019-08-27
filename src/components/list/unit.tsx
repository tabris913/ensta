import * as React from 'react';

import { ListComponentProps } from '../../models/Main';
import { IUnit } from '../../models/unit';
import { IUnitAdditionalState } from '../../reducers/contents/unit';
import ListGenerator from './Base';

const UnitList = (props: ListComponentProps<IUnit, IUnitAdditionalState>) =>
  ListGenerator({
    ...props,
    headers: item => (
      <img src={`./images/unit/${item.logo}`} alt={item.name} style={{ padding: 0, maxWidth: 280, width: '100%' }} />
    ),
    descriptions: ({ item }) => (
      <>
        <p>{item.description_short}</p>
      </>
    ),
  });

export default UnitList;
