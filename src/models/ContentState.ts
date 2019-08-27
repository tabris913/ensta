import { IContent } from './content';
import { EventType } from './Main';

export interface IContentState<T extends IContent> {
  content?: T;
  listPage?: number;
  list?: T[];
  type?: EventType;
}
