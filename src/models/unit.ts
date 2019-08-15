import { IContent } from './content';

export interface IUnit extends IContent {
  description: string;
  description_short: string;
  en: string;
  member: string; // character uid
  color: string;
  logo: string;
}
