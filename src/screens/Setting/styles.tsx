import {Dimensions, StyleSheet} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
import {isTablet} from 'react-native-device-info';
const istablet = isTablet();
const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;
const IsIPAD = aspectRatio < 1.6;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: istablet ? '50%' : '70%',
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
    paddingBottom: istablet ? hp(3.2) :'0%',
  },
  addContainer: {
    height: hp(9),
  },
  promoButtun: {
    height: hp(7),
    width: istablet?wp(46):wp(60),
    position: 'absolute',
    zIndex: 1,
    top: IsIPAD?hp(4):hp(4.7),
    alignSelf: 'center',
  },
});
