import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: '65%',
    alignSelf: 'center',
    width: '100%',
  },
  btnContainer: {
    marginTop: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(8),
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btn: {
    height: hp(8),
    width: wp(30),
  },
});
