import { IContent } from './content';

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
