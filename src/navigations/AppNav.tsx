import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IAppState} from '../states/interfaces';
import {useSelector} from 'react-redux';
import AuthNav from './AuthNav';
import GuestNav from './GuestNav';

const Stack = createNativeStackNavigator();

const AppNav = ({}: {}) => {
  const {isLogin} = useSelector((state: IAppState) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        {isLogin ? (
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="GuestNav"
            component={GuestNav}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
