import Unit from '../../../components/content/Unit';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const UnitPage = ContentPage({
  pageTitle: 'Unit',
  pageName: PageName.UNIT,
  component: Unit,
  contentName: 'unit',
});

export default UnitPage;
