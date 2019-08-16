import { History } from 'history';
import * as R from 'ramda';

import * as Event from '../constants/json/special.json';
import { IEvent, ISpecial, IUnitCollection } from '../models/event';
import { toEvent } from './EventUtils';

export const getSpecial = (uid: string): ISpecial | undefined => {
  if (Object.keys(Event.special).includes(uid)) return Event.special[uid];
  return undefined;
};

export const specialEventIds = Object.keys(Event.special);

export const isSpecial = (obj: IEvent | IUnitCollection | ISpecial): obj is ISpecial => {
  const checkKeys = ['bonus', 'acquirableCards', 'revivalEvents'];

  return R.all(R.equals<boolean>(true), checkKeys.map(key => !Object.keys(obj).includes(key)));
};

export const toSpecial = (history: History, uid: string) => toEvent(history, uid, 'special');
