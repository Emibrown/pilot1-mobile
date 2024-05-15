import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import Button from '../components/Button';
import PhoneNumberInput from '../components/PhoneNumberInput';
import VerificationMethod, {
  IVerificationMethod,
} from '../components/VerificationMethod';

const SignUp = ({navigation}: {navigation: any}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [number, setNumber] = useState<String>();
  const verificationMethodRef = useRef<IVerificationMethod>(null);

  const sendOtp = (method: number | null) => {
    console.log(method);
    verificationMethodRef.current?.close();
    navigation.navigate('Otp');
  };

  const handleOnContinue = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      setTimeout(() => {
        verificationMethodRef.current?.present();
      }, 100);
    } else {
      verificationMethodRef.current?.present();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      enabled={Platform.OS === 'ios'}
      style={[styles.container, {paddingBottom: bottom, paddingTop: top}]}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.info}>
          Enter your phone number to get{'\n'}started
        </Text>
        <View style={styles.input}>
          <PhoneNumberInput onChangeText={value => setNumber(value)} />
        </View>
        <View style={styles.btnContainer}>
          <Button
            text="Continue"
            disabled={number?.length === 11 ? false : true}
            onPress={handleOnContinue}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of service</Text>. Read out{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
      <VerificationMethod
        ref={verificationMethodRef}
        onSubmit={method => sendOtp(method)}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 28,
    color: colors.textDark,
    lineHeight: 33,
  },
  info: {
    color: colors.textDarkAsh,
    fontSize: 16,
    fontFamily: fonts.Regular,
    lineHeight: 21,
    marginTop: 15,
  },
  input: {
    marginTop: 20,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  link: {
    color: colors.brandPrimaryBase,
  },
  btnContainer: {
    marginTop: 20,
  },
});
