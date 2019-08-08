import { ICards } from './card';

export interface IEvent {
  uid: string;
  name: string;
  short_name?: string;
  description: string;
  description_short?: string;
  start: string;
  end: string;
  bonus?: IBonus;
  relation?: string[]; // unit uid etc
  banner: string[];
  img?: string;
}

export interface IBonus {
  ranking: ICards;
  point: ICards;
}