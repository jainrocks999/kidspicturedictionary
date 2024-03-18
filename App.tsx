import {View, Text, AppState, LogBox} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import utils from './src/utils';

const App = () => {
  const appState = useRef(AppState.currentState);
  LogBox.ignoreAllLogs();

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

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
