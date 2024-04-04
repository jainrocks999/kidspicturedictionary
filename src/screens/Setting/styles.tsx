import {StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import {isTablet} from 'react-native-device-info';
const istablet = isTablet();
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: istablet ? '55%' : '70%',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(8),
  },
  img: {
    height: '100%',
    width: '100%',
    marginTop: '10%',
  },
  btn: {
    height: hp(8),
    width: wp(30),
    bottom: 0,
  },
  setting: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: istablet ? '1.5%' : '0%',
  },
  addContainer: {
    height: hp(9),
  },
});
