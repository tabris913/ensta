import { ContentName } from '../../constants/ContentName';
import { EventType } from '../Main';

export interface IContentRequest {
  uid: string;
  contentName: ContentName;
  type?: EventType;
}
