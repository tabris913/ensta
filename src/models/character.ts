import { IContent } from './content';
import { IEvent } from './event';
import { Rarelity } from './Main';
import { IScout } from './scout';

export interface ICharacter extends IContent {
  birthday: string;
  bloodType?: 'A' | 'B' | 'O' | 'AB';
  height: number;
  weight: number;
  catchPhrase: string;
  favorite?: string[];
  unfavorite?: string[];
  imgs: string[];
  club?: string;
  class?: string;
  unit: string[]; // unit uids
}

export interface ICharacterHistory {
  content: IEvent | IScout;
  rarelity: Rarelity;
}
