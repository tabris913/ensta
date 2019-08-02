import * as Event from '../constants/json/event.json';
import { IEvent } from '../models/event';

export const getEvent = (uid: string): IEvent | undefined => {
  if (Object.keys(Event.event).includes(uid)) return Event.event[uid];
  return undefined;
};

export const eventIds = Object.keys(Event.event);
