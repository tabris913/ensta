import Character from '../../../components/content/Character';
import PageName from '../../../constants/PageName';
import { getCharacter } from '../../../utils/CharacterUtils';
import ContentPage from './ContentPage';

const CharacterPage = ContentPage({
  pageTitle: 'Character',
  pageName: PageName.CHARACTER,
  component: Character,
  getFunc: getCharacter,
});

export default CharacterPage;
