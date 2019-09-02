import { History } from 'history';
import * as R from 'ramda';

import * as Event from '../constants/json/event.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { IContent } from '../models/content';
import { IEvent, INormalEvent } from '../models/event';
import { EventType } from '../models/Main.js';

export const getEvent = (uid: string): INormalEvent | undefined => {
  if (Object.keys(Event.event).includes(uid)) return Event.event[uid];
  return undefined;
};

export const getEvents = () => {
  const list: INormalEvent[] = [];

  eventIds
    .map(getEvent)
    .filter(e => e !== undefined)
    .map(e => list.push(e!));
  return list;
};

export const eventIds = Object.keys(Event.event);

export const isEvent = (content?: IContent): content is IEvent => content !== undefined;

export const isEventUid = (uid: string) => uid.startsWith('e');

export const toEvent = (history: History, uid: string, type?: EventType) =>
  history.push(toPublicUrl(PageName.EVENT, [uid], type ? { type: type } : {}));

export const isNormalEvent = (obj: IContent): obj is INormalEvent => {
  const checkKeys = ['bonus'];

  return (
    obj.uid.startsWith('e') &&
    R.all(
      R.equals<boolean>(true),
      checkKeys.map(key => Object.keys(obj).includes(key) && !R.isNil(obj[key]) && !R.isEmpty(obj[key]))
    )
  );
};

export const getCharacterEvent = (uid: string) =>
  getEvents().filter(e => e.bonus.ranking['5'].includes(uid) || e.bonus.point['5'].includes(uid));
