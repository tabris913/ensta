import { ICards } from './card';
import { IContent } from './content';

interface EventBody extends IContent {
  description: string;
  start: string;
  end: string;
  relation?: string[]; // unit uid etc
  banner: string[];
  img?: string;
}

export interface INormalEvent extends EventBody {
  short_name?: string;
  description_short?: string;
  bonus: IBonus;
}

export interface IBonus {
  ranking: ICards;
  point: ICards;
}

export interface ISpecialEvent extends EventBody {}

export interface IUnitCollection extends EventBody {
  acquirableCards: string[]; // card uids
  revivalEvents: string[]; // event uids
}

export type IEvent = INormalEvent | ISpecialEvent | IUnitCollection;
