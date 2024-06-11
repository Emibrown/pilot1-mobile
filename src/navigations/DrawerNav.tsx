import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import Dashboard from '../screens/Dashboard';
import ConnectDriver from '../screens/ConnectDriver';

const Drawer = createDrawerNavigator();

function DrawerNav(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      initialRouteName="Dashboard"
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ConnectDriver"
        component={ConnectDriver}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
