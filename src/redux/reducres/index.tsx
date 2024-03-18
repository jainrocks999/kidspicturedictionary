import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {db_data, seeting_db, setting_type} from '../../types/Genius/db';
import utils from '../../utils';
import {rootNaviation} from '../../types/Genius/action';

export interface FetchDataParams {
  tableName: string;
  category: string | null;
  random: boolean;
  length: number;
  dataType: 'data' | 'setting';
  navigation: rootNaviation | null;
  currentCat: string;
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
    currentCat,
  }: FetchDataParams) => {
    const data: db_data | setting_type = await utils.db(
      tableName,
      category,
      random,
      length,
    );
    navigation?.navigate('Detail_Screen');
    return {[dataType]: dataType == 'data' ? data : data[0], currentCat};
  },
);

interface PicState {
  default_sound: boolean;
  screens: {
    prev: string;
    current: string;
  };
  data: db_data;
  setting: seeting_db;
  currentCat: string;
}

const initialState: PicState = {
  default_sound: true,
  screens: {
    prev: '',
    current: '',
  },
  data: [],
  setting: {
    Bgsound: '',
    id: 0,
    Random: '',
    Swipe: '',
    Voice: '',
  },
  currentCat: '',
};

const picSlice = createSlice({
  name: 'picDict',
  initialState,
  reducers: {
    baby_flash_them: (state, action) => {
      return {...state, default_sound: action.payload};
    },
    update_setting: (state, action) => {
      return {...state, setting: action.payload};
    },
    setPageChange: (state, action) => {
      return {...state, screens: action.payload};
    },
    setUpdateData: (state, action) => {
      return {...state, data: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return {...state, ...action.payload};
    });
  },
});

export default picSlice.reducer;
