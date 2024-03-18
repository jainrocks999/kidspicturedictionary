import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#a4a6a5',
  },
  cat_image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  btnContainer: {
    height: hp(7),
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: hp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
  },
  btn: {
    height: '80%',
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {height: '100%', width: '100%'},
  drawer: {
    flex: 1,
    backgroundColor: '#06203b',
  },
  recoring: {
    height: hp(7.5),
    width: hp(7.5),
  },
  recoring2: {
    height: hp(12),
    width: hp(12),
  },
  RecordContainer: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    top: hp(1),
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trash: {
    // borderEndWidth: 5,
    height: hp(8),
    width: hp(8),
    position: 'absolute',
    right: wp(4),
  },
});
