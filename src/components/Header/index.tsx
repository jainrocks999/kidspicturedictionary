import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import utils from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {navigationParams} from '../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';

type props = {
  ishome: boolean;
  onRightPress: () => void;
};
const Header: React.FC<props> = ({ishome, onRightPress}) => {
  const navigation = useNavigation<StackNavigationProp<navigationParams>>();

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <TouchableOpacity
          disabled={ishome}
          onPress={() => {}}
          style={styles.iconContainer}>
          {!ishome ? (
            <Image
              style={styles.icon}
              source={require('../../assets/icon_image/home_left.png')}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={
              ishome
                ? require('../../assets/icon_image/setting_btn.png')
                : require('../../assets/icon_image/btnSlider.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp(7.5),
    width: '100%',
    paddingBottom: '2%',
    //borderWidth: 1,
  },
  row: {
    width: '93%',
    alignSelf: 'center',
    height: '70%',
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    height: hp(5.5),
    width: hp(5.5),
  },
  txt: {
    fontSize: wp(7),
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
  },
  txt2: {
    fontSize: wp(5),
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    alignSelf: 'center',
    marginBottom: '5%',
  },
});
