import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import AppNav from './src/navigations/AppNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppNav />
    </GestureHandlerRootView>
  );
}

export default App;
