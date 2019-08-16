import { IContent } from './content';

export interface IContentState<T extends IContent> {
  content: T;
  listPage: number;
}
