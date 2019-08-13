import * as R from 'ramda';

import * as Event from '../constants/json/event.json';
import { IEvent, IUnitCollection, ISpecial } from '../models/event';

export const getEvent = (uid: string): IEvent | undefined => {
  if (Object.keys(Event.event).includes(uid)) return Event.event[uid];
  return undefined;
};

export const eventIds = Object.keys(Event.event);

export const isEvent = (obj: IEvent | IUnitCollection | ISpecial): obj is IEvent => {
  const checkKeys = ['bonus'];

  return R.all(
    R.equals<boolean>(true),
    checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key]) && !R.isEmpty(obj[key]))
  );
};
