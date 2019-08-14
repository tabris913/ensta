import * as R from 'ramda';

import * as Event from '../constants/json/event.json';
import { IContent } from '../models/content';
import { IEvent, ISpecial, IUnitCollection } from '../models/event';

export const getEvent = (uid: string): IEvent | undefined => {
  if (Object.keys(Event.event).includes(uid)) return Event.event[uid];
  return undefined;
};

export const eventIds = Object.keys(Event.event);

export const isEvent = (content?: IContent): content is IEvent | ISpecial | IUnitCollection => content !== undefined;

export const isNormalEvent = (obj: IEvent | IUnitCollection | ISpecial): obj is IEvent => {
  const checkKeys = ['bonus'];

  return R.all(
    R.equals<boolean>(true),
    checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key]) && !R.isEmpty(obj[key]))
  );
};
