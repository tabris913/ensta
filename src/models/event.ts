import { ICards } from './card';

interface EventBody {
  uid: string;
  name: string;
  description: string;
  start: string;
  end: string;
  relation?: string[]; // unit uid etc
  banner: string[];
  img?: string;
}

export interface IEvent extends EventBody {
  short_name?: string;
  description_short?: string;
  bonus: IBonus;
}

export interface IBonus {
  ranking: ICards;
  point: ICards;
}

export interface ISpecial extends EventBody {}

export interface IUnitCollection extends EventBody {
  acquirableCards: string[]; // card uids
  revivalEvents: string[]; // event uids
}
