import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import CustomIcon from './CustomIcon';

function DrawerContent(props: any): JSX.Element {
  const {top} = useSafeAreaInsets();

  const handleNavigation = useCallback(
    (screen: string) => {
      props.navigation.navigate(screen);
      props.navigation.closeDrawer();
    },
    [props],
  );

  return (
    <ScrollView style={styles.drawer}>
      <View style={styles.content}>
        <View style={[styles.profile, {marginTop: top}]}>
          <View style={styles.image} />
          <Text style={styles.name}>Emi Brown</Text>
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
                <Text style={styles.buttonText}>Account</Text>
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
                  name="car-02"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>My Rides</Text>
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
                  name="coupon-01"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>Promotion</Text>
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
                  name="help-circle"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>Get Help</Text>
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
                  name="information-circle"
                  size={20}
                  color={colors.neutralN600}
                />
                <Text style={styles.buttonText}>About</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: colors.bkgLight,
  },
  content: {
    flex: 1,
    backgroundColor: colors.bkgLight,
    gap: 5,
  },
  profile: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  label: {
    position: 'absolute',
    bottom: -18,
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
  menu: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 16,
    overflow: 'hidden',
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
});
