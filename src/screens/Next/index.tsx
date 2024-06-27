import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import utils from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {FetchDataParams, fetchData} from '../../redux/reducres';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {IAPContext} from '../../Context';
type props = StackScreenProps<navigationParams, 'Next_Screen'>;

const Next: React.FC<props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const dispatch = useDispatch<any>();
  const {currentCat, setting, screens} = useSelector(
    (state: rootState) => state.data,
  );
  const handleOnPress = (btn: 'home' | 'repeat' | 'next') => {
    if (btn === 'home') {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
      return;
    }
    if (btn === 'repeat') {
      navigation.replace('Detail_Screen');
      return;
    }
    if (btn === 'next') {
      const currentIndex = utils.Categoreis.findIndex(
        item => item.cate_name === currentCat,
      );
      if (currentIndex < utils.Categoreis.length - 1) {
        const item = utils.Categoreis[currentIndex + 1];

        handleOnCategory(item.cate_name);
        return;
      } else {
        navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
      }
    }
  };

  const handleOnCategory = (cate_name: string) => {
    const fetchdata: FetchDataParams = {
      tableName: 'tbl_items',
      category: cate_name,
      random: setting.Random === 'Yes',
      dataType: 'data',
      length: 0,
      currentCat: cate_name,
      navigation: null,
    };
    navigation.replace('Detail_Screen');
    dispatch(fetchData(fetchdata));
  };
  useEffect(() => {
    handOnSound();
  }, [setting, screens]);
  useEffect(() => {
    const un = setTimeout(() => {
      dispatch({
        type: 'picDict/setUpdateData',
        payload: [],
      });
    }, 500);

    return () => {
      un;
    };
  }, []);

  useEffect(() => {
    !IAP?.hasPurchased ? utils.showAdd() : null;
  }, []);

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
    setting.Bgsound == 'Yes' && screens.current == 'Next_Screen'
      ? await utils.player(track)
      : await utils.resetPlayer();
  };

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="stretch"
      source={require('../../assets/Bg_image/settingpage.png')}>
      <StatusBar backgroundColor={utils.COLORS.yellow} />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.btnContainer}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleOnPress('home');
                }}
                style={styles.btn}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require('../../assets/icon_image/home_left.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Home</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleOnPress('repeat');
                }}
                style={styles.btn}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require('../../assets/icon_image/repeat.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Repeat</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleOnPress('next');
                }}
                style={styles.btn}>
                <Image
                  style={[styles.img]}
                  resizeMode="contain"
                  source={require('../../assets/icon_image/next_last.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Next</Text>
            </View>
          </View>
        </View>
        {!IAP?.hasPurchased && (
          <BannerAd
            unitId={utils.addIts.BANNER ?? ''}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Next;
