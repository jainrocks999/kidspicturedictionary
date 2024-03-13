import utils from '../../utils';
import {rootNaviation} from './action';
import {seeting_db} from './db';

export interface payloadType {
  cate_data: (typeof utils.Categoreis)[0];
  setting_data: seeting_db;
  navigation: rootNaviation;
}
