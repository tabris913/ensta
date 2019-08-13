import * as Card from '../constants/json/card.json';
import { ICard } from '../models/card';

export const getCard = (uid: string): ICard | undefined => {
  if (Object.keys(Card.card).includes(uid)) return Card.card[uid];
  return undefined;
};

export const searchCard = (str: string): ICard[] =>
  Object.keys(Card.card)
    .filter(e => e.startsWith(str))
    .map(uid => Card.card[uid]);

export const cardIds = Object.keys(Card.card);
