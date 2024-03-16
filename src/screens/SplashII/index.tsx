import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import utils from '../../utils';
import {FetchDataParams, fetchData} from '../../redux/reducres';
import {useDispatch} from 'react-redux';
type props = StackScreenProps<navigationParams, 'SPlash_ScreenII'>;
const SplashII: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const color = utils.COLORS;
  useEffect(() => {
    setTimeout(() => {
      goTo();
    }, 2000);
  }, []);
  const goTo = () => {
    requestPermission();
    getSetting();
    navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
  };
  const getSetting = () => {
    const fetchdata: FetchDataParams = {
      tableName: 'tbl_settings',
      category: null,
      random: false,
      dataType: 'setting',
      length: 0,
      navigation: null,
      currentCat: '',
    };
    dispatch(fetchData(fetchdata));
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="stretch"
      source={require('../../assets/Bg_image/Splash.png')}>
      <StatusBar backgroundColor={color.yellow} />
    </ImageBackground>
  );
};

export default SplashII;
