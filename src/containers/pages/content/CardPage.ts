import Card from '../../../components/content/Card';
import PageName from '../../../constants/PageName';
import { getCard } from '../../../utils/CardUtils';
import ContentPage from './ContentPage';

const CardPage = ContentPage({ pageTitle: 'Card', pageName: PageName.CARD, component: Card, getFunc: getCard });

export default CardPage;
