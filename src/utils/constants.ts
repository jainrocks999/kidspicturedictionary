import {Platform} from 'react-native';

const productSkus = Platform.select({
  android: ['picturedictionary'],
  ios: ['com.eflash.eFlash.proupgrade'],
});
export default {
  productSkus: productSkus,
};
