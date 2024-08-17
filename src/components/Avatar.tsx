import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const img = require('../assets/avatar.jpeg');

export default function Avatar({size}: {size: number}) {
  return (
    <View
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <Image source={img} style={{width: size, height: size}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
