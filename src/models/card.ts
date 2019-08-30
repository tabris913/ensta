import { IContent } from './content';
import { CardType, Rarelity } from './Main';

export interface ICard extends IContent {
  character: string; // character uid
  rank: Rarelity;
  type: CardType;
  date: string;
  skill?: ISkill;
  parameter?: {
    initial?: IParameter;
    max?: IParameter;
  };
  content: string[]; // event or scout uid
  bonus?: string;
  img: string[];
  remarks: string;
}

interface ISkill {
  lesson: string;
  produce: string;
}

interface IParameter {
  dance: number;
  vocal: number;
  performance: number;
}

export interface ICards {
  '5': string[]; // card uid
  '4': string[]; // card uid
  '3': string[]; // card uid
  '2': string[]; // card uid
  '1': string[]; // card uid
}
