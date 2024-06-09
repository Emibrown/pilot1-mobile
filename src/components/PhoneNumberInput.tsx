// import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Pressable, View, TextInput, Text} from 'react-native';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import CustomIcon from './CustomIcon';

export interface IPhoneNumberInput {
  callCode?: {
    flag: string;
    code: string;
  };
  placeholder?: string;
  onChangeText: (v: string) => void;
}

export default function PhoneNumberInput({
  callCode = {
    flag: '🇳🇬',
    code: '+234',
  },
  placeholder,
  onChangeText,
}: IPhoneNumberInput) {
  const [inputFocus, setFocus] = useState<boolean>(true);
  const [searchValue, setValue] = useState<string>();
  const textInput = useRef<TextInput>(null);
  // const isFocused = useIsFocused();

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      onChangeText(value);
    },
    [onChangeText],
  );

  // useEffect(() => {
  //   if (isFocused) {
  //     setTimeout(() => {
  //       textInput.current?.focus();
  //     }, 100);
  //   }
  // }, [isFocused]);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: inputFocus
            ? colors.brandPrimaryBase
            : colors.neutralN100,
        },
      ]}>
      <View style={[styles.searchCode]}>
        <Text style={styles.text}>{callCode?.flag}</Text>
        <Text style={styles.text}>{callCode?.code}</Text>
      </View>
      <View style={styles.bar} />
      <View
        style={[
          styles.search,
          styles.searchInput,
          inputFocus && styles.focusSearch,
        ]}>
        <TextInput
          ref={textInput}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={searchValue}
          autoFocus
          keyboardType="phone-pad"
          onChangeText={handleChange}
          selectionColor={colors.brandPrimaryBase}
          placeholder={placeholder}
          style={[styles.input, searchValue ? {paddingRight: 0} : {}]}
        />
        {searchValue && (
          <Pressable onPress={() => handleChange('')} style={{padding: 8}}>
            <CustomIcon name="cancel-01" size={20} color={colors.textDarkAsh} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 19,
    borderRightWidth: 1,
    borderRightColor: colors.neutralN100,
  },
  searchCode: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  searchInput: {
    flex: 2,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  focusSearch: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.textDark,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 20,
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.textDarkAsh,
    padding: 0,
  },
});
