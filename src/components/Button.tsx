import React from 'react';
import {StyleSheet, Platform, Text, Pressable, View} from 'react-native';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';

export default function Button({
  text,
  onPress,
  primary = true,
  disabled = false,
}: {
  text: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <View style={{borderRadius: 24, overflow: 'hidden'}}>
      <Pressable
        disabled={disabled}
        android_ripple={{
          color: 'white',
          borderless: true,
        }}
        style={({pressed}) => [
          pressed && Platform.OS === 'ios' ? {opacity: 0.7} : {},
          styles.container,
          !primary || disabled ? {backgroundColor: colors.neutralN100} : {},
        ]}
        onPress={onPress}>
        <Text
          style={[
            styles.buttonText,
            !primary || disabled ? {color: colors.textDark} : {},
          ]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    backgroundColor: colors.brandPrimaryBase,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
});
