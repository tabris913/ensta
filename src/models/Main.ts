import { History } from 'history';

export interface QueryType {
  id?: string;
  page?: number;
  type?: string;
}

export interface MainContentProps {
  history: History;
  query: QueryType;
}

export interface TitleProps extends MainContentProps {}

export interface BodyProps extends MainContentProps {}
