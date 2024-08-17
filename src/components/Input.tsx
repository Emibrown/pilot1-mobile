import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardType,
  Animated,
} from 'react-native';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';

export interface IInput {
  keyboardType: KeyboardType;
  placeholder: string;
  onChangeText: (v: string) => void;
}

export default function Input({
  keyboardType,
  placeholder,
  onChangeText,
}: IInput) {
  const position = useRef(new Animated.Value(0)).current;
  const [inputFocus, setFocus] = useState<boolean>(false);
  const [searchValue, setValue] = useState<string>();
  const textInput = useRef<TextInput>(null);

  const handleFocus = useCallback(() => {
    setFocus(true);
    if (!inputFocus) {
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [inputFocus, position]);

  const handleBlur = useCallback(() => {
    setFocus(false);
    if (inputFocus && !searchValue) {
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [inputFocus, position, searchValue]);

  const returnAnimatedTitleStyles = useCallback(() => {
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 5],
      }),
      fontSize: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 11],
      }),
    };
  }, [position]);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <View
      style={[
        styles.search,
        styles.searchInput,
        inputFocus && styles.focusSearch,
      ]}>
      <Animated.Text style={[styles.titleStyles, returnAnimatedTitleStyles()]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        ref={textInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchValue}
        keyboardType={keyboardType}
        onChangeText={handleChange}
        selectionColor={colors.brandPrimaryBase}
        style={[styles.input, searchValue ? {paddingRight: 0} : {}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchCode: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  searchInput: {
    flex: 2,
  },
  search: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutralN400,
    borderRadius: 16,
    height: 48,
  },
  focusSearch: {
    borderWidth: 1.5,
    borderColor: colors.brandPrimaryBase,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.Regular,
    color: colors.textDarkAsh,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 15,
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.textDarkAsh,
    padding: 0,
    height: 50,
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: fonts.Medium,
    color: colors.textDarkAsh,
    left: 10,
  },
});
