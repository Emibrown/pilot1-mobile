import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {UPDATE_USER} from '../states/ActionTypes';

const SetupProfile = ({navigation}: {navigation: any}) => {
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleLogin = useCallback(() => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        isLogin: true,
        firstName,
        lastName,
        email,
      },
    });
  }, [dispatch, email, firstName, lastName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      enabled={Platform.OS === 'ios'}
      style={[styles.container, {paddingBottom: bottom}]}>
      <Header onClick={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Setup your Profile</Text>
        <Text style={styles.info}>
          Please enters your details to complete your profile.
        </Text>
        <View style={styles.input}>
          <View style={styles.name}>
            <Input
              placeholder="First Name"
              keyboardType={'default'}
              onChangeText={text => setFirstName(text)}
            />
            <Input
              placeholder="Last Name"
              keyboardType={'default'}
              onChangeText={text => setLastName(text)}
            />
          </View>
          <Input
            placeholder="Email (Optional)"
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            text="Continue"
            disabled={!firstName || !lastName ? true : false}
            onPress={handleLogin}
          />
        </View>
      </ScrollView>
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
    fontFamily: fonts.Bold,
    fontSize: 28,
    color: colors.textDark,
    lineHeight: 29,
  },
  info: {
    color: colors.textDarkAsh,
    fontSize: 16,
    fontFamily: fonts.Regular,
    lineHeight: 19,
    marginTop: 15,
  },
  input: {
    marginTop: 20,
    gap: 20,
  },
  name: {
    flexDirection: 'row',
    gap: 10,
  },
  btnContainer: {
    marginTop: 40,
  },
});

export default SetupProfile;
