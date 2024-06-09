import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import Dashboard from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

function DrawerNav(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
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
    </Drawer.Navigator>
  );
}

export default DrawerNav;
