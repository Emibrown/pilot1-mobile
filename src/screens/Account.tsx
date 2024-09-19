import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
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
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
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
        </View>
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Verified</Text>
          </View>
        </View>
        <View style={styles.verification}>
          <CustomIcon
            name="user-square"
            size={20}
            color={colors.brandPrimaryP800}
          />
          <Text style={styles.verifiedText}>Get Photo Verified</Text>
        </View>
        <View style={styles.menu}>
          <View style={{overflow: 'hidden'}}>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon name="user" size={20} color={colors.neutralN600} />
                <Text style={styles.buttonText}>Account Details</Text>
              </View>
            </Pressable>
          </View>

          <View style={{overflow: 'hidden'}}>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon
                  name="wallet-01"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>Wallet</Text>
              </View>
              <Text style={styles.amount}>N600</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.menu}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Saved Addresses</Text>
          </View>
          <View style={{overflow: 'hidden'}}>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon
                  name="home_FILL0_wght300_GRAD0_opsz24"
                  size={20}
                  color={colors.neutralN600}
                />
                <View>
                  <Text style={styles.buttonText}>Home</Text>
                  <Text style={styles.address} numberOfLines={1}>
                    78 Woji road, PortHarcourt
                  </Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon name="work" size={20} color={colors.neutralN600} />
                <View>
                  <Text style={styles.buttonText}>Work</Text>
                  <Text style={styles.address} numberOfLines={1}>
                    78 Woji road, PortHarcourt
                  </Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                styles.border,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon
                  name="add-01"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>Add more address</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.menu}>
          <View style={{overflow: 'hidden'}}>
            <Pressable
              android_ripple={{
                color: colors.neutralN100,
                // borderless: true,
              }}
              style={({pressed}) => [
                styles.buttonContainer,
                pressed && Platform.OS === 'ios'
                  ? {backgroundColor: colors.neutralN100}
                  : {},
              ]}
              onPress={() => {}}>
              <View style={styles.menuInfo}>
                <CustomIcon
                  name="logout-03"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>Log out</Text>
              </View>
            </Pressable>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profile: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 16,
  },
  label: {
    backgroundColor: colors.label,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -12,
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
  verification: {
    backgroundColor: colors.brandSecondaryS200,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colors.brandPrimaryBase,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 5,
    marginTop: 20,
  },
  verifiedText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.textDark,
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 8,
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.textDark,
  },
  amount: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: colors.textAsh,
    textAlign: 'right',
  },
  title: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.textDark,
  },
  border: {
    borderTopWidth: 0.5,
    borderTopColor: colors.textDarkAsh,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.textLight,
  },
});
