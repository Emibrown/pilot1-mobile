import React from 'react';
import {StyleSheet, Platform, Pressable, View} from 'react-native';
import {colors} from '../res/colors';
import CustomIcon from './CustomIcon';

export default function FloatingButton({onPress}: {onPress: () => void}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.press}>
        <Pressable
          android_ripple={{
            color: colors.neutralN100,
            // borderless: true,
          }}
          style={({pressed}) => [
            styles.content,
            pressed && Platform.OS === 'ios'
              ? {backgroundColor: colors.neutralN100}
              : {},
          ]}
          onPress={onPress}>
          <CustomIcon
            name="arrow-left-02-round"
            size={20}
            color={colors.neutralN900}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // left: 15,
    height: 43,
    width: 43,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 4,
  },
  press: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
