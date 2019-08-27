import Card from '../../../components/content/Card';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const CardPage = ContentPage({
  pageTitle: 'Card',
  pageName: PageName.CARD,
  component: Card,
  contentName: 'card',
});

export default CardPage;
