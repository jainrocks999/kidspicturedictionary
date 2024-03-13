import {payloadType} from './playload';
import type {NavigationProp} from '@react-navigation/native';
import {navigationParams} from '../../navigation';
export type actionType = {
  payload: payloadType;
};
export type rootNaviation = NavigationProp<navigationParams>;
