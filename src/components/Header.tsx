import React, {useCallback} from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  Text,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import CustomIcon from './CustomIcon';

export default function Header({
  title,
  icon = 'arrow-left-02-round',
  onClick,
}: {
  title?: string;
  icon?: string;
  onClick: () => void;
}) {
  const {top} = useSafeAreaInsets();

  const handleBackPress = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      onClick();
    } else {
      onClick();
    }
  }, [onClick]);

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.backButton}>
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
          onPress={handleBackPress}>
          <CustomIcon name={icon} size={30} color={colors.neutralN900} />
        </Pressable>
      </View>
      {title && (
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    borderRadius: 40,
    marginVertical: 10,
    overflow: 'hidden',
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
  },
  titleText: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
});
