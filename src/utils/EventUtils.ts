import { History } from 'history';
import * as R from 'ramda';

import * as Event from '../constants/json/event.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { IContent } from '../models/content';
import { IEvent, ISpecial, IUnitCollection } from '../models/event';
import { EventType } from '../models/Main.js';

export const getEvent = (uid: string): IEvent | undefined => {
  if (Object.keys(Event.event).includes(uid)) return Event.event[uid];
  return undefined;
};

export const eventIds = Object.keys(Event.event);

export const isEvent = (content?: IContent): content is IEvent | ISpecial | IUnitCollection => content !== undefined;

export const toEvent = (history: History, uid: string, type?: EventType) =>
  history.push(toPublicUrl(PageName.EVENT, undefined, type ? { id: uid, type: type } : { id: uid }));

export const isNormalEvent = (obj: IEvent | IUnitCollection | ISpecial): obj is IEvent => {
  const checkKeys = ['bonus'];

  return R.all(
    R.equals<boolean>(true),
    checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key]) && !R.isEmpty(obj[key]))
  );
};
