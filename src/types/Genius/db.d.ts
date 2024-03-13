import utils from '../../utils';

export type db_data = db_item[];

export interface db_item {
  record_sound: string;
  sound: string;
  sentence: string;
  word: string;
  ID: number;
  image: string;
  category: string;
}
export type   setting_type = seeting_db[];

export interface seeting_db {
  Swipe: string;
  RandomOrder: string;
  Game: string;
  Voice: string;
  GameLevel: string;
  _id: number;
}
export type categoreis = (typeof utils.Categoreis)[0];
