import { ContentName } from './ContentName';

export const PageTitle: { [K in ContentName]: string } = {
  event: 'Event',
  scout: 'Scout',
  unit: 'Unit',
  character: 'Character',
  card: 'Card',
};
