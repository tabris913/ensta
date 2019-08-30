import CharacterHistory from '../../../components/content/CharacterHistory';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const CharacterHistoryPage = ContentPage({
  pageTitle: 'Character History',
  pageName: PageName.CHARACTER_HISTORY,
  component: CharacterHistory,
  contentName: 'character',
});

export default CharacterHistoryPage;
