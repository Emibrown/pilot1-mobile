import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import CodeInput from '../components/CodeInput';
import VerificationMethod, {
  IVerificationMethod,
} from '../components/VerificationMethod';

const Otp = ({navigation}: {navigation: any}) => {
  const {bottom} = useSafeAreaInsets();
  const verificationMethodRef = useRef<IVerificationMethod>(null);

  const sendOtp = (method: number | null) => {
    console.log(method);
    verificationMethodRef.current?.close();
  };

  const verifyOtp = (v: string) => {
    console.log(v);
    if (v.length === 5) {
      setTimeout(() => {
        navigation.navigate('SetupProfile');
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      enabled={Platform.OS === 'ios'}
      style={[styles.container, {paddingBottom: bottom}]}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Verify phone number</Text>
        <Text style={styles.info}>
          Enter the 4 digit code we sent to 09087654321 via SMS.
        </Text>
        <View style={styles.codeInput}>
          <CodeInput length={5} onChangeText={v => verifyOtp(v)} />
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.footerText}>
            Didn’t get a code?{' '}
            <Text
              style={styles.link}
              onPress={() => verificationMethodRef.current?.present()}>
              Resend code
            </Text>
          </Text>
        </View>
      </View>
      <VerificationMethod
        ref={verificationMethodRef}
        onSubmit={method => sendOtp(method)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.textDark,
    lineHeight: 29,
  },
  info: {
    color: colors.textDarkAsh,
    fontSize: 14,
    fontFamily: fonts.Regular,
    lineHeight: 19,
    marginTop: 15,
  },
  btnContainer: {
    marginTop: 25,
  },
  codeInput: {
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Regular,
  },
  link: {
    color: colors.brandPrimaryBase,
    textDecorationLine: 'underline',
  },
});

export default Otp;
