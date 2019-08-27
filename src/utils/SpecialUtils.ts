import { History } from 'history';
import * as R from 'ramda';

import * as Event from '../constants/json/special.json';
import { INormalEvent, ISpecialEvent, IUnitCollection } from '../models/event';
import { toEvent } from './EventUtils';

export const getSpecial = (uid: string): ISpecialEvent | undefined => {
  if (Object.keys(Event.special).includes(uid)) return Event.special[uid];
  return undefined;
};

export const getSpecials = () => {
  const list: ISpecialEvent[] = [];

  specialEventIds
    .map(getSpecial)
    .filter(s => s !== undefined)
    .map(s => list.push(s!));
  return list;
};

export const specialEventIds = Object.keys(Event.special);

export const isSpecial = (obj: INormalEvent | IUnitCollection | ISpecialEvent): obj is ISpecialEvent => {
  const checkKeys = ['bonus', 'acquirableCards', 'revivalEvents'];

  return R.all(R.equals<boolean>(true), checkKeys.map(key => !Object.keys(obj).includes(key)));
};

export const toSpecial = (history: History, uid: string) => toEvent(history, uid, 'special');
