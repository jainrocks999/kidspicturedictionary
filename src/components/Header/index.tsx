import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import utils from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {navigationParams} from '../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {isTablet}from 'react-native-device-info'
const isteblet =isTablet();
type props = {
  ishome: boolean;
  onRightPress: () => void;
  title: {
    title1: string;
    title2: string;
  };
  onLeftPress: () => void;
  isDetail: boolean;
  onUpgradePress: () => void;
  hasPurchased: boolean;
};
const Header: React.FC<props> = ({
  ishome,
  onRightPress,
  title,
  onLeftPress,
  isDetail,
  onUpgradePress,
  hasPurchased,
}) => {
  const getArray = () => {
    const sentence = title.title2?.split(' ');
    return sentence;
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <TouchableOpacity
          disabled={ishome}
          onPress={onLeftPress}
          style={styles.iconContainer}>
          {!ishome ? (
            <Image
              style={styles.icon}
              source={require('../../assets/icon_image/home_left.png')}
            />
          ) : null}
        </TouchableOpacity>
        {title.title1 != '' ? (
          <View style={{alignItems: 'center', marginTop: '-1%'}}>
            <Text style={styles.title}>{title.title1}</Text>
            <View style={{flexDirection: 'row'}}>
              {getArray()?.map((item, index) => (
                <Text
                  key={index.toString()}
                  style={[
                    styles.title,
                    {
                      color:
                        item.toLowerCase() == title.title1.toLowerCase()
                          ? 'white'
                          : 'black',
                      marginLeft: wp(1.3),
                    },
                  ]}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        ) : ishome && !hasPurchased ? (
          <TouchableOpacity
            onPress={onUpgradePress}
            style={{height: hp(7), width: isteblet?wp(43):wp(60), marginLeft: '-7%',overflow:'hidden'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../assets/icon_image/upgrade.png')}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={onRightPress} style={[styles.iconContainer,{marginRight:'2%'}]}>
          {isDetail || ishome ? (
            <Image
              style={styles.icon}
              source={
                ishome
                  ? require('../../assets/icon_image/setting_btn.png')
                  : require('../../assets/icon_image/btnSlider.png')
              }
            />
          ) : null}
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
    width: '95%',
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
    height: hp(6),
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
  title: {
    fontSize: wp(4),
    color: 'white',
    fontWeight: '800',
  },
});
