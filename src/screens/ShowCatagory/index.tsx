import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import styles from './styles';
import Header from '../../components/Header';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import utils from '../../utils';
import {isTablet} from 'react-native-device-info';
import TrackPlayer from 'react-native-track-player';
import {heightPercent} from '../../utils/responsive';
import {Drawer} from 'react-native-drawer-layout';
import DrawerContent from '../../components/DrawerContent';

type props = StackScreenProps<navigationParams, 'Detail_Screen'>;
const Detail: React.FC<props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {data} = useSelector((state: rootState) => state.data);
  const translationX = useSharedValue(0);
  const [count, setCount] = useState(0);
  const changeImageWithAnimation = async (direction: string) => {
    setCount(pre => (direction == 'next' ? pre + 1 : pre - 1));
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
      translationX.value = direction === 'next' ? +300 : -300;
      translationX.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
      palySound(newIndex, '');
    } else {
      await TrackPlayer.reset();
      // utils.showAdd();
      // navigation.replace('Next_Screen');
    }
  };
  const tablet = isTablet();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });

  const palySound = async (index: number, butn: string) => {
    const track = {
      url: `${utils.path}${data[index].sound}`,
      title: data[currentIndex].word,
      artist: 'eFlashApps',
      album: 'eFlashApps',
      genre: 'welcome to geniues baby flash cards',
      date: new Date().toDateString(),
      artwork: `${utils.path}${data[index].sentence}`,
      duration: 4,
    };
    await utils.player(track);
  };
  const [open, setOpen] = useState(false);
  const renderDrawerContent = () => {
    return (
      <DrawerContent
        onPress={index => {
          if (index != -1) {
            setCurrentIndex(index);
            setOpen(false);
            palySound(index, 'list');
          } else {
            setOpen(false);
          }
        }}
        data={data}
      />
    );
  };

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      renderDrawerContent={renderDrawerContent}
      drawerPosition="right">
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={require('../../assets/Bg_image/background.png')}>
        <Header ishome={false} onRightPress={() => setOpen(prev => !prev)} />
        <PanGestureHandler
          onGestureEvent={({nativeEvent}) => {
            translationX.value = nativeEvent.translationX;
          }}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.END) {
              if (nativeEvent.translationX > 50 && currentIndex > 0) {
                changeImageWithAnimation('prev');
              } else if (
                nativeEvent.translationX < -50 &&
                currentIndex < data.length
              ) {
                changeImageWithAnimation('next');
              }
              translationX.value = withTiming(0, {
                duration: 300,
                easing: Easing.ease,
              });
            }
          }}>
          <Animated.View
            style={[
              styles.cat_image,
              animatedStyle,
              tablet ? {marginTop: heightPercent(5)} : undefined,
            ]}>
            <Image
              resizeMode="stretch"
              style={styles.img}
              source={{
                uri: `${utils.path}${data[
                  currentIndex
                ]?.image.toLocaleLowerCase()}`,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => changeImageWithAnimation('prev')}
            style={styles.btn}>
            <Image
              style={styles.img}
              resizeMode="stretch"
              source={require('../../assets/icon_image/btnPrevious.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              palySound(currentIndex, 'reapet');
            }}
            style={styles.btn}>
            <Image
              resizeMode="contain"
              style={[styles.img, {height: '100%'}]}
              source={require('../../assets/icon_image/repeat_sound.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeImageWithAnimation('next')}
            style={styles.btn}>
            <Image
              style={styles.img}
              resizeMode="stretch"
              source={require('../../assets/icon_image/btnNext.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Drawer>
  );
};

export default Detail;
