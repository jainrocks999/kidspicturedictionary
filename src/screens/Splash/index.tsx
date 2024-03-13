import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import Video from 'react-native-video';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
type props = StackScreenProps<navigationParams, 'SPlash_Screen'>;
const Splash: React.FC<props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SPlash_ScreenII');
    }, 5500);
  }, []);
  return (
    <View style={{flex: 1, borderWidth: 1}}>
      <StatusBar backgroundColor={'#f2f4f5'} />
      <Video
        resizeMode="stretch"
        style={styles.backgroundVideo}
        source={require('../../assets/video/eflash.mp4')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: hp(100),
    width: wp(100),
  },
});

export default Splash;
