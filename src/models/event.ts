import { ICards } from './card';
import { IContent } from './content';
import { EventType } from './Main';

interface EventBody extends IContent {
  description: string;
  start: string;
  end: string;
  relation?: string[]; // unit uid etc
  banner: string[];
  img?: string;
  type: EventType;
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

export interface ISpecialEvent extends EventBody {
  bonus: IBonus & { bonus: ICards };
}

export interface IUnitCollection extends EventBody {
  acquirableCards: string[]; // card uids
  revivalEvents: string[]; // event uids
}

export type IEvent = INormalEvent | ISpecialEvent | IUnitCollection;
