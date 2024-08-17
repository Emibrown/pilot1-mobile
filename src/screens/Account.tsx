import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {ScrollView} from 'react-native';
import {colors} from '../res/colors';
import Avatar from '../components/Avatar';
import CustomIcon from '../components/CustomIcon';
import {useSelector} from 'react-redux';
import {IAppState} from '../states/interfaces';
import {fonts} from '../res/fonts';

const Account = ({navigation}: {navigation: any}) => {
  const {firstName, lastName} = useSelector((state: IAppState) => state.user);

  return (
    <View style={styles.container}>
      <Header onClick={() => navigation.goBack()} bgk={colors.bkgLight} />
      <ScrollView style={styles.content}>
        <View style={[styles.profile]}>
          <Avatar size={70} />
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <View style={styles.rating}>
            <CustomIcon
              name="star_fill"
              size={15}
              color={colors.brandPrimaryP500}
            />
            <Text style={styles.ratingText}>5.0 Rating</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>Verified</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bkgLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profile: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  label: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: colors.label,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: colors.labelText,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.Bold,
    color: colors.textDark,
    marginTop: 10,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.textLight,
  },
});
