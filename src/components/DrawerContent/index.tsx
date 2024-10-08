import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {db_data} from '../../types/Genius/db';
import {widthPrecent as wp, heightPercent as hp} from '../../utils/responsive';
import utils from '../../utils';
import { isTablet } from 'react-native-device-info';
const isteblet =isTablet();
type props = {
  data: db_data;
  onPress: (index: number) => void;
};

const DrawerContent: React.FC<props> = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(-1)} style={styles.menuBtn}>
        <Image
          resizeMode="contain"
          source={require('../../assets/icon_image/btnSlider.png')}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.index}>{`Index : ${data[1]?.category}`}</Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.ID.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.list}>
                <TouchableOpacity
                  onPress={() => onPress(index)}
                  activeOpacity={0.7}
                  style={styles.mainContainer}>
                  <Image
                    style={styles.image}
                    resizeMode="stretch"
                    source={{
                      uri: `${utils.path}${item.image.toLocaleLowerCase()}`,
                    }}
                  />
                  <Text
                    style={[styles.index, {marginLeft: '7%', width: '45%'}]}>
                    {item.word}
                  </Text>
                  {item.record_sound == 'yes' ? (
                    <Image
                      resizeMode="contain"
                      style={styles.man}
                      source={require('../../assets/icon_image/main_talk_btn1.png')}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06203b',
    paddingBottom: hp(5.5),
  },
  header: {
    backgroundColor: 'black',
    height: '6%',
    paddingLeft: '6%',
    justifyContent: 'center',
  },
  index: {
    color: '#acacac',
    fontSize: wp(5),
    fontWeight: '600',
  },
  list: {
    height: hp(15),
    borderBottomWidth: hp(0.2),
    borderBottomColor: 'grey',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  image: {
    height:isteblet?hp(13):hp(13),
    width: isteblet?wp(15):wp(22),
    borderRadius: wp(2),
  },
  menuBtn: {
    height: hp(7),
    width: hp(7),
    position: 'absolute',
    zIndex: 1,
    right: wp(2),
    top: hp(0),
  },
  man: {
    height: hp(8),
    width: hp(8),
  },
});
