import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import AppNav from './src/navigations/AppNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import reducers from './src/states/reducers';

const store = configureStore({
  reducer: reducers,
});

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppNav />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
