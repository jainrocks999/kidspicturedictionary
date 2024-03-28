import {
  ImageBackground,
  StatusBar,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

type props = StackScreenProps<navigationParams, 'Home_Screen'>;
const Home: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const {data, setting, screens} = useSelector(
    (state: rootState) => state.data,
  );

  const handleOnCategory = async (item: categoreis) => {
    const fetchdata: FetchDataParams = {
      tableName: 'tbl_items',
      category: item.cate_name,
      random: setting.Random == 'Yes' ? true : false,
      dataType: 'data',
      length: 0,
      currentCat: item.cate_name,
      navigation,
    };
    dispatch(fetchData(fetchdata));
  };
  useEffect(() => {
    handOnSound();
  }, [setting, screens]);
  console.log(screens);

  const handOnSound = async () => {
    const track = {
      url: `${utils.path}theme.mp3`,
      title: 'theme',
      artist: 'eFlashApps',
      album: 'eFlashApps',
      genre: 'welcome to geniues baby flash cards',
      date: new Date().toDateString(),
      artwork: `${utils.path}theme.mp3`,
      duration: 4,
    };
    setting.Bgsound == 'Yes' && screens.current == 'Home_Screen'
      ? await utils.player(track)
      : await utils.resetPlayer();
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.container}
      source={require('../../assets/Bg_image/background.png')}>
      <StatusBar backgroundColor={utils.COLORS.yellow} />
      <SafeAreaView style={styles.container}>
        <Header
          onRightPress={() => {
            navigation.navigate('Setting_Screen');
          }}
          onLeftPress={() => {
            null;
          }}
          isDetail={false}
          ishome
          title={{title1: '', title2: ''}}
        />
        <ScrollView>
          <CategoryList data={utils.Categoreis} onPress={handleOnCategory} />
          <CategoryList
            data={utils.promo}
            onPress={(item: any) => Linking.openURL(item.link)}
          />
        </ScrollView>
        {/* <BannerAd
          unitId={utils.addIts.BANNER ?? ''}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
