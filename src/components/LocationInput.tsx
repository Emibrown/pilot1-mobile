import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View, TextInput, Animated} from 'react-native';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import CustomIcon from './CustomIcon';
import IconButton from './IconButton';
import {useNavigation} from '@react-navigation/native';

export type ILocationInput = {
  focus: () => void;
  isFocused: () => boolean | undefined;
};

export interface props {
  placeholder: string;
  onChangeText: (v: string) => void;
  onFocus?: () => void;
  onClear?: () => void;
  type: 'From' | 'To';
  value?: string;
}

export interface ILocationIcon {
  size: number;
}

export const LocationIcon = ({size}: ILocationIcon) => {
  return (
    <View
      style={[
        styles.location,
        {height: size, width: size, borderRadius: size / 2},
      ]}
    />
  );
};

const LocationInput = forwardRef<ILocationInput, props>(
  ({placeholder, onChangeText, onFocus, onClear, type, value}, ref) => {
    const position = useRef(new Animated.Value(0)).current;
    const [inputFocus, setFocus] = useState<boolean>(false);
    const [searchValue, setValue] = useState<string>(value || '');
    const textInput = useRef<TextInput>(null);
    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
      focus() {
        textInput.current?.focus();
      },
      isFocused() {
        return textInput.current?.isFocused();
      },
    }));

    const handleFocus = useCallback(() => {
      setFocus(true);
      if (onFocus) {
        onFocus();
      }
    }, [onFocus]);

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

    const handleChange = useCallback(
      (value: string) => {
        setValue(value);
        onChangeText(value);
      },
      [onChangeText],
    );

    useEffect(() => {
      if (value) {
        setValue(value);
      }
    }, [value]);

    const goToMap = useCallback(() => {
      navigation.navigate('ChooseLocationMap', {
        type: type,
      });
    }, [type, navigation]);

    const clearText = useCallback(() => {
      if (onClear) {
        setValue('');
        onClear();
      }
    }, [onClear]);

    return (
      <View style={[styles.search, inputFocus && styles.focusSearch]}>
        <View style={styles.icon}>
          {!inputFocus ? (
            type === 'From' ? (
              <LocationIcon size={14} />
            ) : (
              <CustomIcon
                name="location-06"
                size={16}
                color={colors.brandPrimaryBase}
              />
            )
          ) : (
            <CustomIcon name="search" size={16} color={colors.neutralN300} />
          )}
        </View>
        <TextInput
          ref={textInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          value={searchValue}
          keyboardType={'web-search'}
          onChangeText={handleChange}
          selectionColor={colors.brandPrimaryBase}
          placeholderTextColor={colors.textAsh}
          style={[styles.input, searchValue ? {paddingRight: 10} : {}]}
        />
        {inputFocus && (
          <>
            <IconButton
              size={20}
              background={false}
              icon="maps-location-02"
              onPress={goToMap}
            />
            <IconButton
              size={20}
              background={false}
              icon="cancel-01"
              onPress={clearText}
            />
          </>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  search: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.bkgAsh,
    height: 40,
  },
  focusSearch: {
    borderWidth: 1,
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
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.textDark,
    // padding: 0,
    height: 40,
    // paddingRight: 20,
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: fonts.Medium,
    color: colors.textDarkAsh,
    left: 10,
  },
  location: {
    borderWidth: 5,
    borderColor: colors.brandPrimaryP800,
  },
  icon: {
    margin: 10,
  },
});

export default LocationInput;
