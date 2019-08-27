import Character from '../../../components/content/Character';
import PageName from '../../../constants/PageName';
import ContentPage from './ContentPage';

const CharacterPage = ContentPage({
  pageTitle: 'Character',
  pageName: PageName.CHARACTER,
  component: Character,
  contentName: 'character',
});

export default CharacterPage;
