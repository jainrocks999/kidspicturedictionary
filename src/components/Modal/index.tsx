import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercent,
  heightPercent as hp,
  widthPrecent as wp,
} from '../../utils/responsive';
import * as Progress from 'react-native-progress';
type props = {
  visible: boolean;
  onClose: () => void;
  onRecord: () => void;
  onPlay: () => void;
  recoring: boolean;
  progress: number;
  plaprogess: number;

  isplaying: boolean;
};
const Modals: React.FC<props> = ({
  visible,
  onClose,
  onRecord,
  recoring,
  onPlay,
  progress,
  plaprogess,
  isplaying,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.conatiner}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={onRecord}
            style={[
              styles.btn,
              {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Progress.Pie progress={progress} size={hp(6)} color="white" />
            <Image
              resizeMode="contain"
              style={{height: '100%', width: '100%', position: 'absolute'}}
              source={
                !recoring
                  ? require('../../assets/icon_image/rec_button.png')
                  : require('../../assets/icon_image/stoprec_button.png')
              }
            />
          </TouchableOpacity>
          <Text style={styles.txt}>{!recoring ? 'Record' : 'Stop'}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={onPlay}
            style={[
              styles.btn,
              {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Progress.Pie progress={plaprogess} size={hp(6)} color="white" />
            <Image
              resizeMode="contain"
              style={{height: '122%', width: '122%', position: 'absolute'}}
              source={require('../../assets/icon_image/playRecorded.png')}
            />
          </TouchableOpacity>
          <Text style={styles.txt}>{!isplaying ? 'Play' : 'Stop'}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/icon_image/closeButton.png')}
            />
            <Text style={styles.txt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  conatiner: {
    paddingVertical: hp(0.5),
    backgroundColor: 'rgba(69, 71, 71,0.7)',
    marginTop: hp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  txt: {
    color: 'white',
    fontSize: hp(2.3),
    fontWeight: '700',
    marginTop: '2%',
  },
});
