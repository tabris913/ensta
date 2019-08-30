import { History } from 'history';
import * as R from 'ramda';

import * as Event from '../constants/json/unitCollection.json';
import { IContent } from '../models/content.js';
import { IUnitCollection } from '../models/event';
import { toEvent } from './EventUtils';

export const getUnitCollection = (uid: string): IUnitCollection | undefined => {
  if (Object.keys(Event.unitCollection).includes(uid)) return Event.unitCollection[uid];
  return undefined;
};

export const getUnitCollections = () => {
  const list: IUnitCollection[] = [];

  unitCollectionIds
    .map(getUnitCollection)
    .filter(u => u !== undefined)
    .map(u => list.push(u!));
  return list;
};

export const unitCollectionIds = Object.keys(Event.unitCollection);

export const isUnitCollection = (obj: IContent): obj is IUnitCollection => {
  const checkKeys = ['acquirableCards', 'revivalEvents'];

  return (
    obj.uid.startsWith('uc') &&
    R.all(R.equals<boolean>(true), checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key])))
  );
};

export const toUnitCollection = (history: History, uid: string) => toEvent(history, uid, 'uc');
