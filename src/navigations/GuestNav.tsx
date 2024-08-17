import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import SignUp from '../screens/SignUp';
import Otp from '../screens/Otp';
import SetupProfile from '../screens/SetupProfile';

const Stack = createNativeStackNavigator();

function GuestNav(): JSX.Element {
  return (
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
    </Stack.Navigator>
  );
}

export default GuestNav;
