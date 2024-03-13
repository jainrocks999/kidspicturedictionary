import {View, Text, ImageBackground, StatusBar, Alert} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import styles from './styles';
import utils from '../../utils';
import Header from '../../components/Header';
import CategoryList from '../../components/List_home';
import {categoreis} from '../../types/Genius/db';
import {useDispatch, useSelector} from 'react-redux';
import {FetchDataParams, fetchData} from '../../redux/reducres';
import {rootState} from '../../redux/store';
import {rootNaviation} from '../../types/Genius/action';

type props = StackScreenProps<navigationParams, 'Home_Screen'>;
const Home: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const data = useSelector((state: rootState) => state.data.data);

  const handleOnCategory = async (item: categoreis) => {
    const fetchdata: FetchDataParams = {
      tableName: 'tbl_items',
      category: item.cate_name,
      random: false,
      dataType: 'data',
      length: 0,
      navigation,
    };
    dispatch(fetchData(fetchdata));
  };
  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.container}
      source={require('../../assets/Bg_image/background.png')}>
      <StatusBar backgroundColor={utils.COLORS.yellow} />
      <Header ishome />
      <CategoryList data={utils.Categoreis} onPress={handleOnCategory} />
    </ImageBackground>
  );
};

export default Home;
