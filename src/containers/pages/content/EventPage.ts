import Event from '../../../components/content/Event';
import PageName from '../../../constants/PageName';
import { TypeType } from '../../../models/Main';
import { getEvent } from '../../../utils/EventUtils';
import { getSpecial } from '../../../utils/SpecialUtils';
import { getUnitCollection } from '../../../utils/UCUtils';
import ContentPage from './ContentPage';

const EventPage = ContentPage({
  pageTitle: 'Event',
  pageName: PageName.EVENT,
  component: Event,
  contentName: 'event',
  getFunc: (uid: string, type?: TypeType) => {
    switch (type) {
      case 'special':
        return getSpecial(uid);
      case 'uc':
        return getUnitCollection(uid);
      default:
        return getEvent(uid);
    }
  },
});

export default EventPage;
