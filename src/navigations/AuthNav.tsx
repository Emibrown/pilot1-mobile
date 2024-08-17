import React from 'react';
import DrawerNav from './DrawerNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectRide from '../screens/SelectRide';
import ConfirmOrder from '../screens/ConfirmOrder';
import Sample from '../screens/Sample';
import ChooseLocationMap from '../screens/ChooseLocationMap';
import RideHistory from '../screens/RideHistory';
import RideDetails from '../screens/RideDetails';
import Account from '../screens/Account';

const Stack = createNativeStackNavigator();

function AuthNav(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
      initialRouteName="Home">
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
        name="ChooseLocationMap"
        component={ChooseLocationMap}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideDetails"
        component={RideDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
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
  );
}

export default AuthNav;
