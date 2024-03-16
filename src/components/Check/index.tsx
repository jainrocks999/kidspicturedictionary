import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
type props = {
  title: string;
  onPress: (val: string) => void;
  value: string;
};
const Check: React.FC<props> = ({title, onPress, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onPress(value == 'Yes' ? 'No' : 'Yes')}
        style={styles.iconContainer}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={
            value == 'Yes'
              ? require('../../assets/icon_image/on.png')
              : require('../../assets/icon_image/off.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default Check;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: hp(8),
  },
  iconContainer: {
    height: hp(7),
    width: hp(7),
    marginRight: '20%',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: hp(4.5),
    fontFamily: 'Caveat-Bold',
    color: 'black',
    textAlign: 'left',
  },
  txtContainer: {
    width: '60%',
    paddingLeft: '20%',
  },
});
