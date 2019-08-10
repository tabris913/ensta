import * as Event from '../constants/json/uc.json';
import { IEvent } from '../models/event';

export const getUnitCollection = (uid: string): IEvent | undefined => {
  if (Object.keys(Event.uc).includes(uid)) return Event.uc[uid];
  return undefined;
};

export const unitCollectionIds = Object.keys(Event.uc);
