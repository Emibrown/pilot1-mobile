import React from 'react';
import {StyleSheet, Platform, Pressable, View} from 'react-native';
import {colors} from '../res/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomIcon from './CustomIcon';

export default function DrawerButton({onPress}: {onPress: () => void}) {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top: top + 10}]}>
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
          <CustomIcon name="bars-3" size={18} color={colors.neutralN900} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    height: 40,
    width: 40,
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
