import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Sample from '../screens/Sample';
import SignUp from '../screens/SignUp';
import Otp from '../screens/Otp';
import SetupProfile from '../screens/SetupProfile';
import DrawerNav from './DrawerNav';
import SelectRide from '../screens/SelectRide';
import ConfirmOrder from '../screens/ConfirmOrder';

const Stack = createNativeStackNavigator();

const AppNav = ({}: {}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}
        initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SetupProfile"
          component={SetupProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectRide"
          component={SelectRide}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sample"
          component={Sample}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
