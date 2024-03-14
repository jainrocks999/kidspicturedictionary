import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  Animated as Anim2,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import utils from '../../utils';
import {isTablet} from 'react-native-device-info';
import TrackPlayer from 'react-native-track-player';
import {heightPercent} from '../../utils/responsive';
import {Drawer} from 'react-native-drawer-layout';
import DrawerContent from '../../components/DrawerContent';
import Modals from '../../components/Modal';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import {FetchDataParams, fetchData} from '../../redux/reducres';
import {categoreis} from '../../types/Genius/db';
const audioRecorderPlayer = new AudioRecorderPlayer();
type props = StackScreenProps<navigationParams, 'Detail_Screen'>;
const Detail: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const [slideAnim] = useState(new Anim2.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recoring, setRecording] = useState(false);
  const {data} = useSelector((state: rootState) => state.data);
  const translationX = useSharedValue(0);
  const [count, setCount] = useState(0);
  const [recording, setRecordings] = useState({
    recordSecs: 0,
    recordTime: '00.00',
  });
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
  const [visible, setVisible] = useState(false);
  // const onRecord = async () => {

  //   const path = `${RNFS.DocumentDirectoryPath}/${data[
  //     currentIndex
  //   ].word.toLocaleLowerCase()}.mp4`;

  //   const audioSet = {
  //     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //     AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //     AVNumberOfChannelsKeyIOS: 2,
  //     AVFormatIDKeyIOS: AVEncodingOption.wav,
  //   };
  //   try {
  //     if (recoring == false) {
  //       setRecording(true);
  //       // Path to save the recorded audio
  //       const result = await audioRecorderPlayer.startRecorder();
  //       console.log(result);
  //     } else {
  //       setRecording(false);
  //       const result = await audioRecorderPlayer.stopRecorder();
  //       audioRecorderPlayer.removePlayBackListener();
  //       console.log('Recording stopped, file saved at:', result);
  //     }
  //   } catch (error) {
  //     console.error('Error during recording:', error);
  //   }
  // };
  // console.log(data[currentIndex].record_sound);
  const [isTrashVisible, setTrashVisible] = useState(false);
  const toggleTrashVisibility = () => {
    const newValue = isTrashVisible ? 0 : heightPercent(10);

    if (isTrashVisible) {
      Anim2.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTrashVisible(!isTrashVisible);
        slideAnim.setValue(0);
      });
    } else {
      Anim2.timing(slideAnim, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTrashVisible(!isTrashVisible);
      });
    }
  };

  const onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.wav,
    };
    const path = `${RNFS.DocumentDirectoryPath}/${data[
      currentIndex
    ].word.toLocaleLowerCase()}.mp4`;

    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordings({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    utils.updateRecord('yes', data[currentIndex].ID);
    console.log(result);
  };
  const onStopRecord = async () => {
    console.log('notrecording');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    console.log(result);
  };
  const onPlay = async () => {
    if (recording) {
      const result = await audioRecorderPlayer.stopRecorder();
    }
    const path = `${RNFS.DocumentDirectoryPath}/${data[
      currentIndex
    ].word.toLocaleLowerCase()}.mp4`;
    const track = {
      url: path,
      title: 'name.file',
      artist: 'eFlashApps',
      album: 'eFlashApps',
      genre: 'welcome to geniues baby flash cards',
      date: new Date().toDateString(),
      artwork: path,
      duration: 4,
    };

    await utils.player(track);
    // audioRecorderPlayer.startPlayer(path);
    // audioRecorderPlayer.setVolume(100);
  };
  // useEffect(() => {
  //   audioRecorderPlayer.addRecordBackListener(e => {
  //     setRecordings({
  //       recordSecs: e.currentPosition,
  //       recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //     });
  //     return;
  //   });
  //   return;
  // }, [audioRecorderPlayer]);
  const toggleRecorder = async (bool: boolean) => {
    if (bool) {
      await onStartRecord();
    } else {
      await onStopRecord();
    }
    setRecording(bool);
  };
  const deleteRecorded = async () => {
    const path = `${RNFS.DocumentDirectoryPath}/${data[
      currentIndex
    ].word.toLocaleLowerCase()}.mp4`;
    const res = await RNFS.exists(path);
    console.log(res);

    if (res) {
      await RNFS.unlink(path);
      await utils.updateRecord('', data[currentIndex].ID);
      handleOnCategory();
    }
  };
  const handleOnCategory = async () => {
    const fetchdata: FetchDataParams = {
      tableName: 'tbl_items',
      category: data[currentIndex].category.toLocaleUpperCase(),
      random: false,
      dataType: 'data',
      length: 0,
      navigation: null,
    };
    dispatch(fetchData(fetchdata));
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
        <Modals
          onRecord={() => {
            toggleRecorder(!recoring);
          }}
          onClose={() => {
            handleOnCategory();
            setVisible(false);
          }}
          onPlay={() => onPlay()}
          visible={visible}
          recoring={recoring}
        />
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
            {!visible ? (
              <View style={styles.RecordContainer}>
                <TouchableOpacity
                  onPress={() => setVisible(true)}
                  style={styles.recoring}>
                  <Image
                    resizeMode="contain"
                    style={styles.img}
                    source={require('../../assets/icon_image/recrding.png')}
                  />
                </TouchableOpacity>
                {data[currentIndex]?.record_sound == 'yes' ? (
                  <>
                    <TouchableOpacity
                      onPress={toggleTrashVisibility}
                      style={styles.recoring2}>
                      <Image
                        resizeMode="contain"
                        style={styles.img}
                        source={require('../../assets/icon_image/main_talk_btn1.png')}
                      />
                    </TouchableOpacity>
                    {isTrashVisible && (
                      <Anim2.View
                        style={[
                          styles.trash,
                          {transform: [{translateY: slideAnim}]},
                        ]}>
                        <TouchableOpacity
                          onPress={() => {
                            deleteRecorded();
                          }}
                          style={{height: '100%', width: '100%'}}>
                          <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require('../../assets/icon_image/trashButton.png')}
                          />
                        </TouchableOpacity>
                      </Anim2.View>
                    )}
                  </>
                ) : null}
              </View>
            ) : null}
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
        {!visible ? (
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
        ) : null}
      </ImageBackground>
    </Drawer>
  );
};

export default Detail;
