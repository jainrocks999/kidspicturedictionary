import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import utils from '../../utils';
import {isTablet} from 'react-native-device-info';
const istablet = isTablet();
type props = {
  item: (typeof utils.Categoreis)[0];
  onPress: () => void;
};
const Card: React.FC<props> = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        resizeMethod="auto"
        resizeMode="stretch"
        style={styles.img}
        source={item.cat_img}
      />
    </TouchableOpacity>
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    height: istablet?hp(30): hp(20),
    width: wp(45),
    margin: '2.5%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
