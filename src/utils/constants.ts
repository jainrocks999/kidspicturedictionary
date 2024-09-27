import {Platform} from 'react-native';

const productSkus = Platform.select({
  android: ['picturedictionary'],
  ios: ['com.eflash.pictureDictionary190812'],
});
export default {
  productSkus: productSkus,
};
