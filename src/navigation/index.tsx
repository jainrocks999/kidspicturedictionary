import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import _routes from './navigation_routes/routes';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import SplashII from '../screens/SplashII';
export type navigationParams = {
  SPlash_Screen: undefined;
  SPlash_ScreenII: undefined;
  Home_Screen: undefined;
  Detail_Screen: undefined;
  Setting_Screen: undefined;
  Memory_Screen: undefined;
  Next_Screen: undefined;
};
const Navigation = () => {
  type RouteKey = keyof navigationParams;
  const dispatch = useDispatch();
  const screens = useSelector((state: rootState) => state.data.screens);

  const Stack = createStackNavigator<navigationParams>();
  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        dispatch({
          type: 'picDict/setPageChange',
          payload: {prev: screens.current, current: name},
        });
      }}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={_routes.navigation_routes[0].name}>
        {_routes.navigation_routes.map(screen => {
          return (
            <Stack.Screen
              key={screen.name as RouteKey}
              name={screen.name}
              component={screen.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
