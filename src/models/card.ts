export interface ICard {
  uid: string;
  name: string;
  character: string; // character uid
  rank: 1 | 2 | 3 | 4 | 5;
  type: 'Da' | 'Vo' | 'Pf';
  skill?: ISkill;
  parameter?: {
    initial?: IParameter;
    max?: IParameter;
  };
  content: string[]; // event or scout uid
  bonus?: string;
  img: string;
}

interface ISkill {
  lesson: string;
  produce: string;
}

interface IParameter {
  dance: number;
  vocal: number;
  performance: number;
}

export interface ICards {
  '5': string[]; // card uid
  '4': string[]; // card uid
  '3': string[]; // card uid
  '2': string[]; // card uid
  '1': string[]; // card uid
}