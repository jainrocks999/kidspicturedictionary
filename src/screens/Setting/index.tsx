import {
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {navigationParams} from '../../navigation';
import styles from './styles';
import utils from '../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import Check from '../../components/Check';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {IAPContext} from '../../Context';
import PurchasedeModal from '../../components/PurchaseModal';
type props = StackScreenProps<navigationParams, 'Setting_Screen'>;
const Setting: React.FC<props> = ({navigation}) => {
  const IAP = useContext(IAPContext);
  const {setting, screens} = useSelector((state: rootState) => state.data);
  const dispatch = useDispatch();
  const [value, setvalue] = useState({
    Voice: 'No',
    Random: 'No',
    Swipe: 'No',
    Bgsound: 'No',
    id: 0,
  });
  useEffect(() => {
    setvalue(prev => ({...setting}));
  }, [setting]);
  const handleOnToggel = (key: string, value: string) => {
    setvalue(prev => ({...prev, [key]: value}));
  };
  const handdleOnSave = () => {
    utils.updateSettings(value);
    dispatch({
      type: 'picDict/update_setting',
      payload: value,
    });
    navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
  };
  useEffect(() => {
    handOnSound();
  }, [setting, screens]);

  const handOnSound = async () => {
    const track = {
      url: `${utils.path}theme.mp3`,
      title: 'theme',
      artist: 'eFlashApps',
      album: 'eFlashApps',
      genre: 'welcome to geniues baby flash cards',
      date: new Date().toDateString(),
      artwork: `${utils.path}theme.mp3`,
      duration: 4,
    };
    setting.Bgsound == 'Yes' && screens.current == 'Setting_Screen'
      ? await utils.player(track)
      : await utils.resetPlayer();
  };
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="stretch"
      source={require('../../assets/Bg_image/settingpage.png')}>
      <StatusBar backgroundColor={utils.COLORS.yellow} />
      {!IAP?.hasPurchased && (
        <PurchasedeModal
          onClose={val => IAP?.setVisible(val)}
          onPress={() => {
            IAP?.requestPurchase();
          }}
          onRestore={() => {
            IAP?.checkPurchases(true);
          }}
          visible={IAP?.visible ?? false}
        />
      )}
      <SafeAreaView style={styles.container}>
        {!IAP?.hasPurchased && (
          <TouchableOpacity
            onPress={() => IAP?.setVisible(true)}
            style={styles.promoButtun}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../assets/icon_image/upgrade.png')}
            />
          </TouchableOpacity>
        )}
        <View style={styles.setting}>
          <View style={styles.logoContainer}>
            <Check
              title="Voice"
              value={value.Voice}
              onPress={value => {
                handleOnToggel('Voice', value);
              }}
            />
            <Check
              title="Bg Music"
              value={value.Bgsound}
              onPress={value => {
                handleOnToggel('Bgsound', value);
              }}
            />
            <Check
              title="Random"
              value={value.Random}
              onPress={value => {
                handleOnToggel('Random', value);
              }}
            />
            <Check
              title="Swipe"
              value={value.Swipe}
              onPress={value => {
                handleOnToggel('Swipe', value);
              }}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({index: 0, routes: [{name: 'Home_Screen'}]});
              }}
              style={styles.btn}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../assets/icon_image/cancel.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handdleOnSave()}
              style={styles.btn}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../assets/icon_image/save.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!IAP?.hasPurchased && (
          <View style={styles.addContainer}>
            <BannerAd
              unitId={utils.addIts.BANNER ?? ''}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Setting;
