import * as R from 'ramda';
import * as Event from '../constants/json/unitCollection.json';

import { IEvent, IUnitCollection, ISpecial } from '../models/event';

export const getUnitCollection = (uid: string): IUnitCollection | undefined => {
  if (Object.keys(Event.unitCollection).includes(uid)) return Event.unitCollection[uid];
  return undefined;
};

export const unitCollectionIds = Object.keys(Event.unitCollection);

export const isUnitCollection = (obj: IEvent | IUnitCollection | ISpecial): obj is IUnitCollection => {
  const checkKeys = ['acquirableCards', 'revivalEvents'];

  return R.all(R.equals<boolean>(true), checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key])));
};