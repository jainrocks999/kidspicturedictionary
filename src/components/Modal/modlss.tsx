import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const App = () => {
  return (
    <View style={styles.conatiner}>
      <View style={{height: 100, width: 100}}>
        <Progress.Pie progress={1} size={100} />
        <View
          style={{
            // backgroundColor: 'white',
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: 50,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/icon_image/playRecorded.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
