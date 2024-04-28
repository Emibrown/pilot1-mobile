import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fonts} from '../res/fonts';

const Onboarding = ({}: {}) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={styles.containerStyle}
      style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <View>
        <Text>Onboarding</Text>
        <Text style={styles.font1}>Onboarding 1</Text>
        <Text style={styles.font2}>Onboarding 2</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  font1: {
    fontFamily: fonts.ExtraBold,
  },
  font2: {
    fontFamily: fonts.Medium,
  },
});

export default Onboarding;
