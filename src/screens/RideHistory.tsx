import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import CustomIcon from '../components/CustomIcon';
import {rides} from '../res/data';
import moment from 'moment';

const img = require('../assets/upcoming-ride.png');

const NoUpcoming = () => {
  return (
    <View style={styles.upcomingCard}>
      <View>
        <Image style={styles.image} source={img} />
      </View>
      <View style={styles.schedule}>
        <Text style={styles.scheduleTitle}>No Upcoming Rides</Text>
        <Text style={styles.scheduleInfo}>
          Have an important event coming? Schedule a ride ahead of time.
        </Text>
        <View style={styles.scheduleFooter}>
          <Text style={styles.sFooterText}>Schedule a ride</Text>
          <CustomIcon
            name="arrow-right-01-round-1"
            size={18}
            color={colors.brandPrimaryBase}
          />
        </View>
      </View>
    </View>
  );
};

const ScheduleRide = () => {
  return (
    <View style={styles.upcomingCard}>
      <View>
        <Image style={styles.image} source={img} />
      </View>
      <View style={styles.schedule}>
        <Text style={styles.scheduleTitle}>No Upcoming Rides</Text>
        <Text style={styles.scheduleInfo}>
          Have an important event coming? Schedule a ride ahead of time.
        </Text>
        <View style={styles.scheduleFooter}>
          <Text style={styles.sFooterText}>Schedule a ride</Text>
          <CustomIcon
            name="arrow-right-01-round-1"
            size={18}
            color={colors.brandPrimaryBase}
          />
        </View>
      </View>
    </View>
  );
};

const Ride = ({
  props,
  onPress,
}: {
  props: {
    pickupAddress: string;
    destinationAddress: string;
    price: string;
    arriveTime: string;
  };
  onPress: () => void;
}) => {
  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <Pressable
        android_ripple={{
          color: colors.neutralN100,
        }}
        style={({pressed}) => [
          styles.rideCard,
          pressed && Platform.OS === 'ios'
            ? {backgroundColor: colors.neutralN100}
            : {},
        ]}
        onPress={onPress}>
        <View style={styles.cardIcon}>
          <CustomIcon name="car-02" size={20} color={colors.rideIcon} />
        </View>
        <View style={styles.cardInfo}>
          <Text numberOfLines={1} style={styles.des}>
            {props.destinationAddress}
          </Text>
          <Text style={styles.cardDate}>
            {moment(props.arriveTime).format('MMM Do, h:mm:ss a')}
          </Text>
        </View>
        <Text style={styles.cardPrice}>N{props.price}</Text>
      </Pressable>
    </View>
  );
};

const RideHistory = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header onClick={() => navigation.goBack()} bgk={colors.bkgLight} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>My Rides</Text>
        <View style={styles.upcoming}>
          <Text style={styles.subTitle}>Upcoming trips</Text>
          <NoUpcoming />
          {rides.map((item: any, i) => (
            <View key={i}>
              {i === 0 ? (
                <Text style={styles.tripDate}>
                  {moment(item.arriveTime).format('MMMM')}{' '}
                  {moment(item.arriveTime).year()}
                </Text>
              ) : moment(item.arriveTime).month() ===
                  moment(rides[i - 1].arriveTime).month() &&
                moment(item.arriveTime).year() ===
                  moment(rides[i - 1].arriveTime).year() ? (
                <></>
              ) : (
                <Text style={styles.tripDate}>
                  {moment(item.arriveTime).format('MMMM')}{' '}
                  {moment(item.arriveTime).year()}
                </Text>
              )}
              <Ride
                props={item}
                onPress={() => navigation.navigate('RideDetails')}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bkgLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: colors.textDark,
    fontFamily: fonts.SemiBold,
  },
  upcoming: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Medium,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginVertical: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.brandPrimaryP900,
  },
  image: {
    height: 60,
    width: 76,
  },
  schedule: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    color: colors.brandPrimaryP950,
    fontFamily: fonts.Bold,
  },
  scheduleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sFooterText: {
    fontSize: 14,
    color: colors.brandPrimaryBase,
    fontFamily: fonts.SemiBold,
  },
  scheduleInfo: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Regular,
    paddingTop: 5,
  },
  rideCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.containerBg,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  cardIcon: {
    backgroundColor: colors.rideIconBkg,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    gap: 5,
  },
  des: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  cardDate: {
    fontSize: 12,
    color: colors.textAsh,
    fontFamily: fonts.Regular,
  },
  cardPrice: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Medium,
  },
  tripDate: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Medium,
    marginBottom: 15,
  },
});
