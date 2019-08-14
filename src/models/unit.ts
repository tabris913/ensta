import { IContent } from './content';

export interface IUnit extends IContent {
  member: string; // character uid
  color: string;
  logo: string;
}
