import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
type props = {
  visible: boolean;
  onClose: () => void;
  onRecord: () => void;
  onPlay: () => void;
  recoring: boolean;
};
const Modals: React.FC<props> = ({
  visible,
  onClose,
  onRecord,
  recoring,
  onPlay,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.conatiner}>
        <TouchableOpacity onPress={onRecord} style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={
              !recoring
                ? require('../../assets/icon_image/rec_button.png')
                : require('../../assets/icon_image/stoprec_button.png')
            }
          />
          <Text style={styles.txt}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlay} style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/icon_image/playRecorded.png')}
          />
          <Text style={styles.txt}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/icon_image/closeButton.png')}
          />
          <Text style={styles.txt}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  conatiner: {
    height: hp(12),
    backgroundColor: 'rgba(69, 71, 71,0.7)',
    marginTop: hp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    height: '60%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: '2%',
  },
});
