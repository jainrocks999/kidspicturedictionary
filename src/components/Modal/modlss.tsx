import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';

const YourComponent = () => {
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout = 124334;

    if (isRecording) {
      intervalId = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(intervalId);
            setIsRecording(false);
            return 100;
          }
          return prevProgress + 100 / 60; // Increment progress by 1.67 every second for 60 seconds (1 minute)
        });
      }, 1000); // Update progress every second
    } else {
      clearInterval(intervalId);
      setProgress(0); // Reset progress when not recording
    }

    return () => clearInterval(intervalId); // Cleanup on unmount or state change
  }, [isRecording]);

  const handleRecordToggle = () => {
    setIsRecording(prevState => !prevState);
  };

  return (
    <TouchableOpacity onPress={handleRecordToggle} style={styles.btn}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarWrapper}>
          <View
            style={[
              styles.progressBar,
              {transform: [{rotate: `${progress * 3.6}deg`}]},
            ]}
          />
        </View>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={
            !isRecording
              ? require('../../assets/icon_image/rec_button.png')
              : require('../../assets/icon_image/stoprec_button.png')
          }
        />
      </View>
      <Text style={styles.txt}>Record</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    // Your button styles
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  progressBarWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'green', // Customize progress bar color here
    borderRadius: 50,
    borderEndColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
  },
  img: {
    // Your image styles
  },
  txt: {
    // Your text styles
  },
});

export default YourComponent;
