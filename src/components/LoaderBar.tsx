import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '../res/colors';

export default function LoaderBar({}: {}) {
  const barWidth = useRef(new Animated.Value(0)).current;
  const progressPercent = barWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(barWidth, {
      duration: 5000,
      toValue: 100,
      useNativeDriver: false,
    }).start();
  }, [barWidth]);

  return (
    <View style={styles.loaderIn}>
      <Animated.View
        style={[
          styles.loaderOut,
          {
            backgroundColor: colors.brandPrimaryBase,
            width: progressPercent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderIn: {
    width: '100%',
    backgroundColor: colors.brandPrimaryP50,
    borderRadius: 10,
  },
  loaderOut: {
    height: 5,
    borderRadius: 10,
  },
});
