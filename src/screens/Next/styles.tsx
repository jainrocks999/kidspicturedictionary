import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(8),
    marginTop: hp(50),
  },
  btn: {
    height: hp(7),
    width: hp(7),
    alignItems: 'center',

    zIndex: 2,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: wp(7),
    color: 'white',
    fontFamily: 'Amiri-BoldItalic',
    marginTop: '-18%',
    elevation: 1,
    zIndex: 1,
  },
});
