import {
  View,
  Text,
  AppState,
  LogBox,
  Platform,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import utils from './src/utils';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import IAPProvider from './src/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const appState = useRef(AppState.currentState);
  LogBox.ignoreAllLogs();
  const doublePressTimeout = useRef<number | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        utils.resetPlayer();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  async function handleBackButtonClick() {
    const DOUBLE_PRESS_DELAY = 2000;
    const currentTime = Date.now();

    if (
      doublePressTimeout.current !== null &&
      doublePressTimeout.current + DOUBLE_PRESS_DELAY >= currentTime
    ) {
      const hasPurchased = await AsyncStorage.getItem('IN_APP_PURCHASE');
      if (hasPurchased) {
        BackHandler.exitApp();
        return true;
      } else {
        showAdd();
        return true;
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
      }
      doublePressTimeout.current = currentTime;
      return true;
    }
  }
  const showAdd = () => {
    const requestOption = {
      requestNonPersonalizedAdsOnly: true,
    };

    const interstitial = InterstitialAd.createForAdRequest(
      utils.addIts.INTERSTITIAL ?? '',
      requestOption,
    );

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
        BackHandler.exitApp();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  useEffect(() => {
    const onBackPress = () => {
      handleBackButtonClick();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
  return (
    <Provider store={store}>
      <IAPProvider>
        <Navigation />
      </IAPProvider>
    </Provider>
  );
};

export default App;
