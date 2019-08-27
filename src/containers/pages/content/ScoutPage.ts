import Scout from '../../../components/content/Scout';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const ScoutPage = ContentPage({
  pageTitle: 'Scout',
  pageName: PageName.SCOUT,
  component: Scout,
  contentName: 'scout',
});

export default ScoutPage;
