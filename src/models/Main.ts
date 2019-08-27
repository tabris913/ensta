import { History } from 'history';
import { ContentName } from '../constants/ContentName';
import { IContent } from './content';
import { IContentState } from './ContentState';
import { IContentRequest } from './request/ContentRequest';
import { IListRequest } from './request/ListRequest';

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
  contents?: { [K in ContentName]: IContentState<any> };
}

export interface ListComponentProps<T extends IContent> extends MainProps {
  saveContent: (content: T) => void;
  getList: (req: IListRequest) => void;
  changeListPage: (req: number) => void;
  contentName: ContentName;
  pageSize?: number;
  headers?: (item: T) => JSX.Element;
  descriptions?: (props: { item: T }) => JSX.Element;
}

export interface MainContentProps<T extends IContent> extends MainProps {
  getContent: (req: IContentRequest) => void;
}

export interface TitleProps<T extends IContent> extends MainContentProps<T> {}

export interface BodyProps<T extends IContent> extends MainContentProps<T> {}
