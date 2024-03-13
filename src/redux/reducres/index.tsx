import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {categoreis, db_data, setting_type} from '../../types/Genius/db';
import utils from '../../utils';
import {Alert} from 'react-native';
import {rootNaviation} from '../../types/Genius/action';

export interface FetchDataParams {
  tableName: string;
  category: string | null;
  random: boolean;
  length: number;
  dataType: 'data' | 'setting';
  navigation: rootNaviation | null;
}

export const fetchData = createAsyncThunk(
  'picDict/fetchData',
  async ({
    tableName,
    category,
    random,
    length,
    dataType,
    navigation,
  }: FetchDataParams) => {
    const data = await utils.db(tableName, category, random, length);
    navigation?.navigate('Detail_Screen');
    return {[dataType]: data};
  },
);

interface PicState {
  default_sound: boolean;
  screens: {
    prev: string;
    current: string;
  };
  data: db_data;
  setting: setting_type;
}

const initialState: PicState = {
  default_sound: true,
  screens: {
    prev: '',
    current: '',
  },
  data: [],
  setting: [],
};

const picSlice = createSlice({
  name: 'picDict',
  initialState,
  reducers: {
    baby_flash_them: (state, action) => {
      return {...state, default_sound: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return {...state, ...action.payload};
    });
  },
});

export default picSlice.reducer;
