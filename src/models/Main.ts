import { History } from 'history';

export type EventType = '' | 'special' | 'uc';
export type ScoutType = '' | 'story' | 'revival';

export interface QueryType {
  id?: string;
  page?: number;
  type?: EventType | ScoutType;
}

export interface MainContentProps {
  history: History;
  query: QueryType;
}

export interface TitleProps extends MainContentProps {}

export interface BodyProps extends MainContentProps {}
