import { ICards } from './card';

interface ScoutBody {
  uid: string;
  name: string;
  description: string;
  start: string;
  end: string;
  cards: ICards;
  relation?: string[];
  banner?: string[];
  img?: string;
}

export interface IScout extends ScoutBody {
  skill?: string;
}

export interface IStoryScout extends ScoutBody {}

export interface IStoryRevival extends ScoutBody {
  revivals?: string[]; // uids of scout
}
