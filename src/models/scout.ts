import { ICards } from './card';
import { IContent } from './content';
import { ScoutType } from './Main';

interface ScoutBody extends IContent {
  description: string;
  start: string;
  end: string;
  cards: ICards;
  relation?: string[];
  banner?: string[];
  img?: string;
  type: ScoutType;
}

export interface IScout extends ScoutBody {
  skill?: string;
}

export interface IStoryScout extends ScoutBody {}

export interface IStoryRevival extends ScoutBody {
  revivals?: string[]; // uids of scout
}
