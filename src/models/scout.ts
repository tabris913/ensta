import { ICards } from './card';

export interface IScout {
  uid: string;
  name: string;
  description: string;
  start: string;
  end: string;
  cards: ICards;
  relation?: string[];
  banner?: string[];
  img?: string;
  skill?: string;
}
