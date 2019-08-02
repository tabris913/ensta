import * as Unit from '../constants/json/unit.json';
import { IUnit } from '../models/unit';

export const getUnit = (uid: string): IUnit | undefined => {
  if (Object.keys(Unit.unit).includes(uid)) return Unit.unit[uid];
  return undefined;
};

export const unitIds = Object.keys(Unit.unit);
