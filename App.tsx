import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Sample from './src/screens/Sample';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigations/AppNav';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: false});
    }, 2000);
  }, []);

  return <AppNav />;
}

export default App;
