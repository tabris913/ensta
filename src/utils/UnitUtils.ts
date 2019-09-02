import { History } from 'history';

import * as Unit from '../constants/json/unit.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { IContent } from '../models/content';
import { IUnit } from '../models/unit';

export const getUnit = (uid: string): IUnit | undefined => {
  if (Object.keys(Unit.unit).includes(uid)) return Unit.unit[uid];
  return undefined;
};

export const getUnits = () => {
  const list: IUnit[] = [];

  unitIds
    .map(getUnit)
    .filter(u => u !== undefined)
    .map(u => list.push(u!));
  return list;
};

export const unitIds = Object.keys(Unit.unit);

export const isUnit = (content?: IContent): content is IUnit => content !== undefined;

export const toUnit = (history: History, uid: string) => history.push(toPublicUrl(PageName.UNIT, [uid]));
