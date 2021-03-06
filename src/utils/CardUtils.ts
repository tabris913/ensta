import { History } from 'history';

import * as Card from '../constants/json/card.json';
import PageName, { toPublicUrl } from '../constants/PageName';
import { ICard } from '../models/card';

export const getCard = (uid: string): ICard | undefined => {
  if (Object.keys(Card.card).includes(uid)) return Card.card[uid];
  return undefined;
};

export const getCards = () => {
  const list: ICard[] = [];

  cardIds
    .map(getCard)
    .filter(c => c !== undefined)
    .map(c => list.push(c!));
  return list;
};

export const searchCard = (eventUid: string, characterUid: string, cardRank: string): ICard[] =>
  Object.keys(Card.card)
    .filter(e => e.startsWith(`${eventUid}_${characterUid}_${cardRank}`))
    .map(uid => Card.card[uid]);

export const cardIds = Object.keys(Card.card);

export const toCard = (history: History, uid: string) => history.push(toPublicUrl(PageName.CARD, [uid]));

export const getEventScoutCard = (uid: string) => getCards().filter(c => c.content.includes(uid));

export const getCharacterCard = (uid: string) => getCards().filter(c => c.character === uid);
