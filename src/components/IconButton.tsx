import React from 'react';
import {StyleSheet, Pressable, View, Platform} from 'react-native';
import {colors} from '../res/colors';
import CustomIcon from './CustomIcon';

export interface IIconButton {
  icon: string;
  onPress: () => void;
  size?: number;
  background?: boolean;
}

export default function IconButton({
  icon,
  onPress,
  size = 20,
  background = true,
}: IIconButton) {
  return (
    <View
      style={[
        styles.iconButton,
        {
          borderRadius: size * 2,
          height: size * 2,
          width: size * 2,
        },
        background && {backgroundColor: colors.bkgLightAsh},
      ]}>
      <Pressable
        android_ripple={{
          color: colors.neutralN100,
          borderless: true,
        }}
        style={({pressed}) => [
          pressed && Platform.OS === 'ios'
            ? {backgroundColor: 'rgba(134, 134, 134, 0.3)'}
            : {},
          styles.button,
        ]}
        onPress={onPress}>
        <CustomIcon name={icon} size={size} color={colors.neutralN900} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
