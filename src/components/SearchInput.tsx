import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import CustomIcon from './CustomIcon';
import IconButton from './IconButton';

export type ISearchInput = {
  focus: () => void;
};

export interface ISearchInputProps {
  placeholder: string;
  onChangeText: (v: string) => void;
}

const SearchInput = forwardRef<ISearchInput, ISearchInputProps>(
  ({placeholder, onChangeText}, ref) => {
    const [inputFocus, setFocus] = useState<boolean>(false);
    const [searchValue, setValue] = useState<string>();
    const textInput = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        textInput.current?.focus();
      },
    }));

    const handleFocus = useCallback(() => {
      setFocus(true);
      if (!inputFocus) {
      }
    }, [inputFocus]);

    const handleChange = useCallback(
      (value: string) => {
        setValue(value);
        onChangeText(value);
      },
      [onChangeText],
    );

    return (
      <View style={[styles.search, inputFocus && styles.focusSearch]}>
        <View style={styles.icon}>
          <CustomIcon name="search" size={16} color={colors.neutralN300} />
        </View>
        <TextInput
          ref={textInput}
          onFocus={handleFocus}
          placeholder={placeholder}
          value={searchValue}
          keyboardType={'web-search'}
          onChangeText={handleChange}
          selectionColor={colors.brandPrimaryBase}
          placeholderTextColor={colors.textAsh}
          style={[styles.input, searchValue ? {paddingRight: 0} : {}]}
        />
        {inputFocus && (
          <IconButton
            size={20}
            background={false}
            icon="cancel-01"
            onPress={() => setValue('')}
          />
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
    padding: 0,
    height: 40,
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

export default SearchInput;
