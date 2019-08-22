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

export interface MainProps {
  history: History;
  query: QueryType;
}

export interface ListComponentProps<T extends IContent> extends MainProps {
  saveContent: (content: T) => void;
}

export interface MainContentProps<T extends IContent> extends MainProps {
  content?: T;
}

export interface TitleProps<T extends IContent> extends MainContentProps<T> {}

export interface BodyProps<T extends IContent> extends MainContentProps<T> {}
