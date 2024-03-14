import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {heightPercent, widthPrecent} from '../../utils/responsive';
const App = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [recording, setRecording] = useState({
    recordSecs: 0,
    recordTime: '00.00',
  });

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();

    console.log(result);
  };
  const onStopRecord = async () => {
    // Alert.alert('called');
    const result = await audioRecorderPlayer.stopRecorder();

    setRecording(prev => ({recordSecs: 0, recordTime: '00:00'}));
    console.log(result);
  };
  const onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      return;
    });
  };
  useEffect(() => {
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecording({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    return audioRecorderPlayer.removeRecordBackListener();
  }, [audioRecorderPlayer]);
  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          onStartRecord();
        }}
        style={{
          height: heightPercent(6),
          width: widthPrecent(35),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          borderRadius: widthPrecent(1),
        }}>
        <Text>start Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onStopRecord();
        }}
        style={{
          height: heightPercent(6),
          width: widthPrecent(35),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          borderRadius: widthPrecent(1),
          marginTop: heightPercent(2),
        }}>
        <Text>Stop recording</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onStartPlay();
        }}
        style={{
          height: heightPercent(6),
          width: widthPrecent(35),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          borderRadius: widthPrecent(1),
          marginTop: heightPercent(2),
        }}>
        <Text>play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onStopPlay();
        }}
        style={{
          height: heightPercent(6),
          width: widthPrecent(35),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          borderRadius: widthPrecent(1),
          marginTop: heightPercent(2),
        }}>
        <Text>stop</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 5}}>{recording.recordTime}</Text>
    </View>
  );
};

export default App;
