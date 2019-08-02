export interface ICharacter {
  uid: string;
  name: string;
  birthday: string;
  bloodType?: 'A' | 'B' | 'O' | 'AB';
  height: number;
  weight: number;
  catchPhrase: string;
  favorite?: string[];
  unfavorite?: string[];
  imgs: [];
}
