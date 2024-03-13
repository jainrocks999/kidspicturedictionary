import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import utils from '../../utils';
type props = StackScreenProps<navigationParams, 'SPlash_ScreenII'>;
const SplashII: React.FC<props> = ({navigation}) => {
  const color = utils.COLORS;
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
    }, 2000);
  }, []);
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
