import { ContentName } from '../../constants/ContentName';
import { EventType } from '../Main';

export interface IListRequest {
  contentName: ContentName;
  type?: EventType;
}
