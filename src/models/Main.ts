import { History } from 'history';
import { IContent } from './content';

export type EventType = '' | 'special' | 'uc';
export type ScoutType = '' | 'story' | 'revival';
export type TypeType = EventType | ScoutType;

export interface QueryType {
  id?: string;
  page?: number;
  type?: TypeType;
}

export interface MainContentProps {
  history: History;
  query: QueryType;
  content?: IContent;
}

export interface TitleProps extends MainContentProps {}

export interface BodyProps extends MainContentProps {}
