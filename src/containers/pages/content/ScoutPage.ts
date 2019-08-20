import Scout from '../../../components/content/Scout';
import PageName from '../../../constants/PageName';
import { getScout } from '../../../utils/ScoutUtils';
import ContentPage from './ContentPage';

const ScoutPage = ContentPage({
  pageTitle: 'Scout',
  pageName: PageName.SCOUT,
  component: Scout,
  contentName: 'scout',
  getFunc: getScout,
});

export default ScoutPage;
