import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';

export default function CodeInput({
  length = 4,
  onChangeText,
}: {
  length?: number;
  onChangeText: (v: string) => void;
}) {
  const textInput = useRef<(TextInput | null)[]>([]);
  const [inputFocus, setFocus] = useState<any>({});
  const [inputValue, setValue] = useState<any>(null);

  const handleChange = useCallback((value: string, i: number) => {
    setValue((preValue: any) => ({
      ...preValue,
      [i]: value,
    }));
  }, []);

  useEffect(() => {
    let value: string = '';
    if (inputValue) {
      Array.from(Array(length).keys()).forEach(i => {
        if (inputValue[i]) {
          value = value + inputValue[i];
        }
      });
      onChangeText(value);
    }
  }, [inputValue, length, onChangeText]);

  return (
    <View style={[styles.search]}>
      {Array.from(Array(length).keys()).map((key, index) => (
        <TextInput
          ref={el => (textInput.current[index] = el)}
          onFocus={() =>
            setFocus({
              [index]: true,
            })
          }
          key={index}
          maxLength={1}
          autoFocus={index === 0}
          keyboardType="number-pad"
          selectionColor={colors.brandPrimaryBase}
          style={[styles.input, inputFocus[index] && styles.focusSearch]}
          onChangeText={value => {
            value && textInput.current[index + 1]?.focus();
            handleChange(value, index);
          }}
          onKeyPress={({nativeEvent: {key: keyValue}}) => {
            if (keyValue === 'Backspace') {
              textInput.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  focusSearch: {
    borderWidth: 1.5,
    borderColor: colors.brandPrimaryBase,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.Regular,
    color: colors.textDark,
    borderRadius: 10,
    height: 60,
    textAlign: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutralN400,
  },
});
