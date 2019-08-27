import Event from '../../../components/content/Event';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const EventPage = ContentPage({
  pageTitle: 'Event',
  pageName: PageName.EVENT,
  component: Event,
  contentName: 'event',
});

export default EventPage;
