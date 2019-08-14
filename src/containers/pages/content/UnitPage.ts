import Unit from '../../../components/content/Unit';
import PageName from '../../../constants/PageName';
import { getUnit } from '../../../utils/UnitUtils';
import ContentPage from './ContentPage';

const UnitPage = ContentPage({ pageTitle: 'Unit', pageName: PageName.UNIT, component: Unit, getFunc: getUnit });

export default UnitPage;
