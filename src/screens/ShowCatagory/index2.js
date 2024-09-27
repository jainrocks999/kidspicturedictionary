import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated as Anim2,
  SafeAreaView,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
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
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {IAPContext} from '../../Context';
const audioRecorderPlayer = new AudioRecorderPlayer();
type props = StackScreenProps<navigationParams, 'Detail_Screen'>;
const Detail: React.FC<props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const dispatch = useDispatch<any>();
  const [slideAnim] = useState(new Anim2.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recoring, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const {data, setting, currentCat} = useSelector(
    (state: rootState) => state.data,
  );
  const translationX = useSharedValue(0);
  const [count, setCount] = useState(0);
  const [recording, setRecordings] = useState({
    recordSecs: 0,
    recordTime: '00.00',
  });

const [recpath,setRecPath]=useState('');

  const [progress, setProgress] = useState(0);
  const [playprogress, setplayProgress] = useState(0);
  const changeImageWithAnimation = async (direction: string) => {
    if (isTrashVisible) {
      setTrashVisible(false);
    }
    setCount(pre => (direction == 'next' ? pre + 1 : pre - 1));
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
      translationX.value = direction === 'next' ? +300 : -300;
      translationX.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
      setting.Voice == 'Yes' ? palySound(newIndex, '') : null;
    } else {
      setCurrentIndex(prev => prev + 1);
      await TrackPlayer.reset();
      if (data.length > 0) {
        navigation.replace('Next_Screen');
      }
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
  const getFildereddata = (value: string, bool: boolean) => {



    const currentitem = data[currentIndex];
    let dataToupdate = [...data];
    dataToupdate[currentIndex] = {...currentitem, record_sound: value};

console.log('data top upddatee ', dataToupdate[currentIndex]);
    
    
    dispatch({
      type: 'picDict/setUpdateData',
      payload: bool ? [] : dataToupdate,
    });
  };

  const onStartRecord = async (bool: boolean) => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.wav,
    };

    const path = Platform.select({
      ios: 'hello.m4a',
      android: `${RNFS.DocumentDirectoryPath}/${data[currentIndex].word.toLowerCase()}${'.mp4'}`,
    });


    if (playing) {
      onStopPlay();
    }
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log('result to data get ',result);
    
    audioRecorderPlayer.addRecordBackListener(e => {
      let recordTime = audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      );


      let progress = calculatePercentageFromTimeString(recordTime, 30);
      
      
      setProgress(progress);
      
      return;
    });
    console.log('data get by downlload ',await RNFS.exists(result));
    if (await RNFS.exists(result)) {
      utils.updateRecord('yes', data[currentIndex].ID);
      getFildereddata('yes', false);
      setRecPath(result);
      setRecording(true);
      console.log('callling');
      
    } else {
      console.log('Noot callling');
      setRecording(false);
      Alert.alert('Something went wrong with recording.');
    }
  };
  function calculatePercentageFromTimeString(
    timeString: string,
    totalTime: number | string,
  ) {
    let time: number = 0;
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    if (typeof totalTime == 'string') {
      const [minuts2, seconds2, milliseconds2] = totalTime
        .split(':')
        .map(Number);
      time = minuts2 * 60 + seconds2 + milliseconds2 / 1000;
    } else {
      time = totalTime;
    }

    const currentTime = minutes * 60 + seconds + milliseconds / 1000;

    return calculatePercentage(currentTime, time);
  }
  function calculatePercentage(currentTime: number, totalTime: number) {
    if (currentTime < 0 || totalTime <= 0) {
      console.log('calllin time retrrun 0 ',currentTime,totalTime);
      return 0;
    }

    if (currentTime >= totalTime) {
      console.log('calllin time  return 1');
      
      onStopPlay();
      setplayProgress(0);
      // onStopRecord();
      return 1;
    }

    return ((currentTime / totalTime) * 100) / 100;
  }
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    await audioRecorderPlayer.removeRecordBackListener();
    setProgress(0);
    setRecording(false);
  };
  const onPlay = async () => {
    if (recording) {
      console.log('hhhhbbg',recording);
      
      onStopRecord();
    }
    // const path = Platform.select({
    //   ios: 'hello.m4a',
    //   android: `${RNFS.DocumentDirectoryPath}/${data[currentIndex].word.toLowerCase()}${'.mp4'}`,
    // });

    const path = `${RNFS.DocumentDirectoryPath}/${data[
      currentIndex
    ].word.toLocaleLowerCase()}${Platform.OS == 'android' ? '.mp4' : '.m4a'}`;
    console.log('ndfjskdkdjskdff',await RNFS.exists(path));
    if (await RNFS.exists(recpath)) {   
      setPlaying(prev => !prev);
      const resul = await audioRecorderPlayer.startPlayer(recpath);

      audioRecorderPlayer.addPlayBackListener(e => {
        let recordTime = audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        );
        let recordTime2 = audioRecorderPlayer.mmssss(Math.floor(e.duration));
        const times = calculatePercentageFromTimeString(
          recordTime,
          recordTime2,
        );
        setplayProgress(times);
      });
    } else {
      Alert.alert('Please record voice first.');
    }
  };
  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setPlaying(false);
    setplayProgress(0);
  };
  useEffect(() => {
    data.length > 0 && setting.Voice == 'Yes' && !visible
      ? palySound(currentIndex, '')
      : utils.resetPlayer();

     
  }, [data]);
  const toggleRecorder = async (bool: boolean) => {
    if (bool) {
      console.log('datatatt',bool);
      
      await onStartRecord(bool);
    } else {
      await onStopRecord();
    }
  };
  const deleteRecorded = async () => {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: `${RNFS.DocumentDirectoryPath}/${data[currentIndex].word.toLowerCase()}${'.mp4'}`,
    });

    // const path = `${RNFS.DocumentDirectoryPath}/${data[
    //   currentIndex
    // ].word.toLocaleLowerCase()}${Platform.OS == 'android' ? '.mp4' : '.m4a'}`;
    const res = await RNFS.exists(path);

    if (res) {
      await RNFS.unlink(path);
      utils.updateRecord('', data[currentIndex].ID);
      getFildereddata('', false);
    }
  };
  useEffect(() => {
    setRecPath('');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        getFildereddata('', true);
        navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);
  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.container}
      source={require('../../assets/Bg_image/background.png')}>
      <SafeAreaView style={styles.container}>
        <Drawer
          drawerStyle={{
            width: '65%',
          }}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          renderDrawerContent={renderDrawerContent}
          drawerPosition="right">
          <Header
            ishome={false}
            isDetail={!open}
            title={{
              title1: data[currentIndex]?.word,
              title2: data[currentIndex]?.sentence,
            }}
            onLeftPress={async () => {
              await TrackPlayer.reset();
              getFildereddata('', true);
              navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
            }}
            onRightPress={() => setOpen(prev => !prev)}
            onUpgradePress={() => {
              null;
            }}
            hasPurchased={IAP?.hasPurchased ?? false}
          />


       {   console.log('progress,,,,',progress)}
          
          <Modals
            onRecord={() => {
              toggleRecorder(!recoring);
            }}
            progress={progress}
            plaprogess={playprogress}
            onClose={async () => {
              if (playing) {
                onStopPlay();
              }
              if (recoring) {
                onStopRecord();
              }

              setVisible(false);
            }}
            onPlay={() => {
              if (data[currentIndex].record_sound == 'yes') {
                !playing ? onPlay() : onStopPlay();
              } else {
                Alert.alert('Please record voice first.');
              }
            }}
            visible={visible}
            recoring={recoring}
            isplaying={playing}
          />
          <PanGestureHandler
            onGestureEvent={({nativeEvent}) => {
              translationX.value = nativeEvent.translationX;
            }}
            onHandlerStateChange={({nativeEvent}) => {
              if (nativeEvent.state === State.END) {
                if (nativeEvent.translationX > 50 && currentIndex > 0) {
                  setting.Swipe == 'Yes'
                    ? changeImageWithAnimation('prev')
                    : null;
                } else if (
                  nativeEvent.translationX < -50 &&
                  currentIndex < data.length
                ) {
                  setting.Swipe == 'Yes'
                    ? changeImageWithAnimation('next')
                    : null;
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
              {setting.Swipe == 'Yes' ? (
                <TouchableOpacity
                  onPress={() => {
                    palySound(currentIndex, 'reapet');
                  }}
                  style={[
                    styles.btn,
                    {
                      height: '18%',
                      width: '18%',
                      position: 'absolute',
                      bottom: 0,
                    },
                  ]}>
                  <Image
                    resizeMode="contain"
                    style={[styles.img, {height: '100%'}]}
                    source={require('../../assets/icon_image/repeat_sound.png')}
                  />
                </TouchableOpacity>
              ) : null}
            </Animated.View>
          </PanGestureHandler>
          {!visible && setting.Swipe !== 'Yes' ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => changeImageWithAnimation('prev')}
                disabled={currentIndex <= 0}
                style={styles.btn}>
                {currentIndex > 0 ? (
                  <Image
                    style={styles.img}
                    resizeMode="stretch"
                    source={require('../../assets/icon_image/btnPrevious.png')}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  palySound(currentIndex, 'reapet');
                }}
                style={[styles.btn, {height: '100%'}]}>
                <Image
                  resizeMode="contain"
                  style={[styles.img, {height: '100%'}]}
                  source={require('../../assets/icon_image/repeat_sound.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={currentIndex == data.length}
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
        </Drawer>
        {!IAP?.hasPurchased && (
          <View>
            <BannerAd
              unitId={utils.addIts.BANNER ?? ''}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Detail;










// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   Animated as Anim2,
//   SafeAreaView,
//   Alert,
//   BackHandler,
//   Platform,
// } from 'react-native';
// import {StackScreenProps} from '@react-navigation/stack';
// import {navigationParams} from '../../navigation';
// import styles from './styles';
// import Header from '../../components/Header';
// import {PanGestureHandler, State} from 'react-native-gesture-handler';
// import Animated, {
//   Easing,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import {useDispatch, useSelector} from 'react-redux';
// import {rootState} from '../../redux/store';
// import utils from '../../utils';
// import {isTablet} from 'react-native-device-info';
// import TrackPlayer from 'react-native-track-player';
// import {heightPercent} from '../../utils/responsive';
// import {Drawer} from 'react-native-drawer-layout';
// import DrawerContent from '../../components/DrawerContent';
// import Modals from '../../components/Modal';
// import AudioRecorderPlayer, {
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
// } from 'react-native-audio-recorder-player';
// import RNFS from 'react-native-fs';
// import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
// import {IAPContext} from '../../Context';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const Detail = ({navigation}) => {
//   const IAP = useContext(IAPContext);
//   const dispatch = useDispatch();
//   const [slideAnim] = useState(new Anim2.Value(0));
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [recoring, setRecording] = useState(false);
//   const [playing, setPlaying] = useState(false);
//   const {data, setting, currentCat} = useSelector(
//     (state) => state.data,
//   );
//   const translationX = useSharedValue(0);
//   const [count, setCount] = useState(0);
//   const [recording, setRecordings] = useState({
//     recordSecs: 0,
//     recordTime: '00.00',
//   });
//   const [progress, setProgress] = useState(0);
//   const [playprogress, setplayProgress] = useState(0);
//   const changeImageWithAnimation = async (direction) => {
//     if (isTrashVisible) {
//       setTrashVisible(false);
//     }
//     setCount(pre => (direction == 'next' ? pre + 1 : pre - 1));
//     const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
//     if (newIndex >= 0 && newIndex < data.length) {
//       setCurrentIndex(newIndex);
//       translationX.value = direction === 'next' ? +300 : -300;
//       translationX.value = withTiming(0, {
//         duration: 300,
//         easing: Easing.ease,
//       });
//       setting.Voice == 'Yes' ? palySound(newIndex, '') : null;
//     } else {
//       setCurrentIndex(prev => prev + 1);
//       await TrackPlayer.reset();
//       if (data.length > 0) {
//         navigation.replace('Next_Screen');
//       }
//     }
//   };
//   const tablet = isTablet();
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: translationX.value}],
//     };
//   });

//   const palySound = async (index, butn) => {
//     const track = {
//       url: `${utils.path}${data[index].sound}`,
//       title: data[currentIndex].word,
//       artist: 'eFlashApps',
//       album: 'eFlashApps',
//       genre: 'welcome to geniues baby flash cards',
//       date: new Date().toDateString(),
//       artwork: `${utils.path}${data[index].sentence}`,
//       duration: 4,
//     };
//     await utils.player(track);
//   };
//   const [open, setOpen] = useState(false);
//   const renderDrawerContent = () => {
//     return (
//       <DrawerContent
//         onPress={index => {
//           if (index != -1) {
//             setCurrentIndex(index);
//             setOpen(false);
//             palySound(index, 'list');
//           } else {
//             setOpen(false);
//           }
//         }}
//         data={data}
//       />
//     );
//   };
//   const [visible, setVisible] = useState(false);

//   const [isTrashVisible, setTrashVisible] = useState(false);
//   const toggleTrashVisibility = () => {
//     const newValue = isTrashVisible ? 0 : heightPercent(10);

//     if (isTrashVisible) {
//       Anim2.timing(slideAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start(() => {
//         setTrashVisible(!isTrashVisible);
//         slideAnim.setValue(0);
//       });
//     } else {
//       Anim2.timing(slideAnim, {
//         toValue: 100,
//         duration: 500,
//         useNativeDriver: true,
//       }).start(() => {
//         setTrashVisible(!isTrashVisible);
//       });
//     }
//   };
//   const getFildereddata = (value, bool) => {
//     const currentitem = data[currentIndex];
//     let dataToupdate = [...data];
//     dataToupdate[currentIndex] = {...currentitem, record_sound: value};
//     dispatch({
//       type: 'picDict/setUpdateData',
//       payload: bool ? [] : dataToupdate,
//     });
//   };

  
//   const onStartRecord = async () => {
//     try {
//         const audioSet = {
//           AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          
//                 AudioSourceAndroid: AudioSourceAndroidType.MIC,
          
//                 AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          
//                 AVNumberOfChannelsKeyIOS: 2,
          
//                 AVFormatIDKeyIOS: AVEncodingOption.aac,
//         };
//         const path = Platform.select({
//           ios: 'hello.m4a',
//           android: `${RNFS.DocumentDirectoryPath}/${data[currentIndex].word.toLowerCase()}${'.mp4'}`,
//         });
// //         const path = Platform.select({
// //   ios: `${RNFS.DocumentDirectoryPath}/hello.m4a`,
// //   android: `${RNFS.DocumentDirectoryPath}/${data[currentIndex].word.toLowerCase()}${'.mp4'}`,
// // });
//         console.log('Recording path:', path,audioSet);
//         if (playing) {
//             await onStopPlay();
//         }
//          console.log('viremddr',await audioRecorderPlayer.startRecorder(path,audioSet));
//         //  const fileExists = await RNFS.exists(path);
//         //   return
//         const result = await audioRecorderPlayer.startRecorder(path,audioSet);
//         console.log('Recording started:', result);

//         audioRecorderPlayer.addRecordBackListener(e => {
//             let recordTime = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition));
//             // console.log('Recording started:, result',recordTime);

//             let progress = calculatePercentageFromTimeString(recordTime, 30);

//             // console.log('Recording started:, progreaaa',progress);
//             setProgress(progress);
//             return;
//         });
     
      
      
//         if (await RNFS.exists(result)) {
//             utils.updateRecord('yes', data[currentIndex].ID);
//             getFildereddata('yes', false);
//             setRecording(false);
//             console.log('callled ');
//         } else {
         
//           console.log('calllednot ');
//             // throw new Error('File does not exist after recording started');
//         }
//     } catch (error) {
//         console.error('Recording error:', error);
//         Alert.alert('Recording error:', error.message || 'Unknown error occurred');
//         setRecording(false);
//     }
// };
  
  
//   // const onStartRecord = async (bool) => {
//   //   const audioSet = {
//   //     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//   //     AudioSourceAndroid: AudioSourceAndroidType.MIC,
//   //     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//   //     AVNumberOfChannelsKeyIOS: 2,
//   //     AVFormatIDKeyIOS: AVEncodingOption.wav,
//   //   };
//   //   const path = `${RNFS.DocumentDirectoryPath}/${data[
//   //     currentIndex
//   //   ].word.toLocaleLowerCase()}${Platform.OS == 'android' ? '.mp4' : '.m4a'}`;
//   //   // Alert.alert(path);

//   //   if (playing) {
//   //     onStopPlay();
//   //   }
//   //   const result = await audioRecorderPlayer.startRecorder(path, audioSet);
//   //   audioRecorderPlayer.addRecordBackListener(e => {
//   //     let recordTime = audioRecorderPlayer.mmssss(
//   //       Math.floor(e.currentPosition),
//   //     );

//   //     let progress = calculatePercentageFromTimeString(recordTime, 30);
//   //     setProgress(progress);

//   //     return;
//   //   });
//   //   if (await RNFS.exists(result)) {
//   //     utils.updateRecord('yes', data[currentIndex].ID);
//   //     getFildereddata('yes', false);
//   //     setRecording(true);
//   //   } else {
//   //     setRecording(false);
//   //     Alert.alert('Something went wrong with recording.');
//   //   }
//   // };
//   function calculatePercentageFromTimeString(
//     timeString,
//     totalTime,
//   ) {
//     let time = 0;
//     const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
//     if (typeof totalTime == 'string') {
//       const [minuts2, seconds2, milliseconds2] = totalTime
//         .split(':')
//         .map(Number);
//       time = minuts2 * 60 + seconds2 + milliseconds2 / 1000;
//     } else {
//       time = totalTime;
//     }

//     const currentTime = minutes * 60 + seconds + milliseconds / 1000;

//     return calculatePercentage(currentTime, time);
//   }
//   function calculatePercentage(currentTime, totalTime) {
//     if (currentTime < 0 || totalTime <= 0) {
//       return 0;
//     }

//     if (currentTime >= totalTime) {
//       onStopPlay();
//       setplayProgress(0);
//       onStopRecord();
//       return 1;
//     }

//     return ((currentTime / totalTime) * 100) / 100;
//   }
//   const onStopRecord = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     await audioRecorderPlayer.removeRecordBackListener();
//     setProgress(0);
//     setRecording(false);
//   };
//   const onPlay = async () => {
//     if (recording) {
//       onStopRecord();
//     }
//     const path = `${RNFS.DocumentDirectoryPath}/${data[
//       currentIndex
//     ].word.toLocaleLowerCase()}${Platform.OS == 'android' ? '.mp4' : '.m4a'}`;

//     if (await RNFS.exists(path)) {
//       setPlaying(prev => !prev);
//       const resul = await audioRecorderPlayer.startPlayer(path);

//       audioRecorderPlayer.addPlayBackListener(e => {
//         let recordTime = audioRecorderPlayer.mmssss(
//           Math.floor(e.currentPosition),
//         );
//         let recordTime2 = audioRecorderPlayer.mmssss(Math.floor(e.duration));
//         const times = calculatePercentageFromTimeString(
//           recordTime,
//           recordTime2,
//         );
//         setplayProgress(times);
//       });
//     } else {
//       Alert.alert('Please record voice first.');
//     }
//   };
//   const onStopPlay = async () => {
//     await audioRecorderPlayer.stopPlayer();
//     audioRecorderPlayer.removePlayBackListener();
//     setPlaying(false);
//     setplayProgress(0);
//   };
//   useEffect(() => {
//     data.length > 0 && setting.Voice == 'Yes' && !visible
//       ? palySound(currentIndex, '')
//       : utils.resetPlayer();
//   }, [data]);
//   const toggleRecorder = async (bool) => {
//     if (bool) {
//       await onStartRecord(bool);
//     } else {
//       await onStopRecord();
//     }
//   };
//   const deleteRecorded = async () => {
//     const path = `${RNFS.DocumentDirectoryPath}/${data[
//       currentIndex
//     ].word.toLocaleLowerCase()}${Platform.OS == 'android' ? '.mp4' : '.m4a'}`;
//     const res = await RNFS.exists(path);

//     if (res) {
//       await RNFS.unlink(path);
//       utils.updateRecord('', data[currentIndex].ID);
//       getFildereddata('', false);
//     }
//   };
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       () => {
//         getFildereddata('', true);
//         navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
//         return true;
//       },
//     );

//     return () => backHandler.remove();
//   }, []);
//   return (
//     <ImageBackground
//       resizeMode="stretch"
//       style={styles.container}
//       source={require('../../assets/Bg_image/background.png')}>
//       <SafeAreaView style={styles.container}>
//         <Drawer
//           drawerStyle={{
//             width: '65%',
//           }}
//           open={open}
//           onClose={() => setOpen(false)}
//           onOpen={() => setOpen(true)}
//           renderDrawerContent={renderDrawerContent}
//           drawerPosition="right">
//           <Header
//             ishome={false}
//             isDetail={!open}
//             title={{
//               title1: data[currentIndex]?.word,
//               title2: data[currentIndex]?.sentence,
//             }}
//             onLeftPress={async () => {
//               await TrackPlayer.reset();
//               getFildereddata('', true);
//               navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
//             }}
//             onRightPress={() => setOpen(prev => !prev)}
//             onUpgradePress={() => {
//               null;
//             }}
//             hasPurchased={IAP?.hasPurchased ?? false}
//           />
//           <Modals
//             onRecord={() => {
//               toggleRecorder(!recoring);
//             }}
//             progress={progress}
//             plaprogess={playprogress}
//             onClose={async () => {
//               if (playing) {
//                 onStopPlay();
//               }
//               if (recoring) {
//                 onStopRecord();
//               }

//               setVisible(false);
//             }}
//             onPlay={() => {
//               if (data[currentIndex].record_sound == 'yes') {
//                 !playing ? onPlay() : onStopPlay();
//               } else {
//                 Alert.alert('Please record voice first.');
//               }
//             }}
//             visible={visible}
//             recoring={recoring}
//             isplaying={playing}
//           />
//           <PanGestureHandler
//             onGestureEvent={({nativeEvent}) => {
//               translationX.value = nativeEvent.translationX;
//             }}
//             onHandlerStateChange={({nativeEvent}) => {
//               if (nativeEvent.state === State.END) {
//                 if (nativeEvent.translationX > 50 && currentIndex > 0) {
//                   setting.Swipe == 'Yes'
//                     ? changeImageWithAnimation('prev')
//                     : null;
//                 } else if (
//                   nativeEvent.translationX < -50 &&
//                   currentIndex < data.length
//                 ) {
//                   setting.Swipe == 'Yes'
//                     ? changeImageWithAnimation('next')
//                     : null;
//                 }
//                 translationX.value = withTiming(0, {
//                   duration: 300,
//                   easing: Easing.ease,
//                 });
//               }
//             }}>
//             <Animated.View
//               style={[
//                 styles.cat_image,
//                 animatedStyle,
//                 tablet ? {marginTop: heightPercent(5)} : undefined,
//               ]}>
//               {!visible ? (
//                 <View style={styles.RecordContainer}>
//                   <TouchableOpacity
//                     onPress={() => setVisible(true)}
//                     style={styles.recoring}>
//                     <Image
//                       resizeMode="contain"
//                       style={styles.img}
//                       source={require('../../assets/icon_image/recrding.png')}
//                     />
//                   </TouchableOpacity>
//                   {data[currentIndex]?.record_sound == 'yes' ? (
//                     <>
//                       <TouchableOpacity
//                         onPress={toggleTrashVisibility}
//                         style={styles.recoring2}>
//                         <Image
//                           resizeMode="contain"
//                           style={styles.img}
//                           source={require('../../assets/icon_image/main_talk_btn1.png')}
//                         />
//                       </TouchableOpacity>
//                       {isTrashVisible && (
//                         <Anim2.View
//                           style={[
//                             styles.trash,
//                             {transform: [{translateY: slideAnim}]},
//                           ]}>
//                           <TouchableOpacity
//                             onPress={() => {
//                               deleteRecorded();
//                             }}
//                             style={{height: '100%', width: '100%'}}>
//                             <Image
//                               resizeMode="contain"
//                               style={styles.img}
//                               source={require('../../assets/icon_image/trashButton.png')}
//                             />
//                           </TouchableOpacity>
//                         </Anim2.View>
//                       )}
//                     </>
//                   ) : null}
//                 </View>
//               ) : null}
//               <Image
//                 resizeMode="stretch"
//                 style={styles.img}
//                 source={{
//                   uri: `${utils.path}${data[
//                     currentIndex
//                   ]?.image.toLocaleLowerCase()}`,
//                 }}
//               />
//               {setting.Swipe == 'Yes' ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     palySound(currentIndex, 'reapet');
//                   }}
//                   style={[
//                     styles.btn,
//                     {
//                       height: '18%',
//                       width: '18%',
//                       position: 'absolute',
//                       bottom: 0,
//                     },
//                   ]}>
//                   <Image
//                     resizeMode="contain"
//                     style={[styles.img, {height: '100%'}]}
//                     source={require('../../assets/icon_image/repeat_sound.png')}
//                   />
//                 </TouchableOpacity>
//               ) : null}
//             </Animated.View>
//           </PanGestureHandler>
//           {!visible && setting.Swipe !== 'Yes' ? (
//             <View style={styles.btnContainer}>
//               <TouchableOpacity
//                 onPress={() => changeImageWithAnimation('prev')}
//                 disabled={currentIndex <= 0}
//                 style={styles.btn}>
//                 {currentIndex > 0 ? (
//                   <Image
//                     style={styles.img}
//                     resizeMode="stretch"
//                     source={require('../../assets/icon_image/btnPrevious.png')}
//                   />
//                 ) : null}
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   palySound(currentIndex, 'reapet');
//                 }}
//                 style={[styles.btn, {height: '100%'}]}>
//                 <Image
//                   resizeMode="contain"
//                   style={[styles.img, {height: '100%'}]}
//                   source={require('../../assets/icon_image/repeat_sound.png')}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 disabled={currentIndex == data.length}
//                 onPress={() => changeImageWithAnimation('next')}
//                 style={styles.btn}>
//                 <Image
//                   style={styles.img}
//                   resizeMode="stretch"
//                   source={require('../../assets/icon_image/btnNext.png')}
//                 />
//               </TouchableOpacity>
//             </View>
//           ) : null}
//         </Drawer>
//         {!IAP?.hasPurchased && (
//           <View>
//             <BannerAd
//               unitId={utils.addIts.BANNER ?? ''}
//               size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//               requestOptions={{
//                 requestNonPersonalizedAdsOnly: true,
//               }}
//             />
//           </View>
//         )}
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default Detail;
