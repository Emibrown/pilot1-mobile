import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {colors} from '../res/colors';
import {ScrollView} from 'react-native';
import {fonts} from '../res/fonts';
import CustomIcon from '../components/CustomIcon';
import IconButton from '../components/IconButton';

const map = require('../assets/map.png');

const Route = () => {
  const [lineTop, setLineTop] = useState<number>(0);
  const [lineBottom, setLineBottom] = useState<number>(0);

  return (
    <View style={styles.route}>
      <View style={styles.shape}>
        <View style={styles.address}>
          <View style={styles.circle}>
            <View style={styles.innerCircle} />
          </View>
          <View
            style={{flex: 1}}
            onLayout={e => {
              setLineTop(e.nativeEvent.layout.height / 2);
            }}>
            <Text style={styles.addressText}>
              No. 78 Woji road, Port-Harcourt, Rivers state, Nigeria
            </Text>
          </View>
          <Text style={styles.addressTime}>12:05</Text>
        </View>
        <View
          style={[
            styles.line,
            {marginTop: -lineTop, marginBottom: -lineBottom},
          ]}
        />
        <View style={styles.address}>
          <View style={styles.circleDes}>
            <View style={styles.innerCircle} />
          </View>
          <View
            style={{flex: 1}}
            onLayout={e => {
              setLineBottom(e.nativeEvent.layout.height / 2);
            }}>
            <Text numberOfLines={2} style={styles.addressText}>
              Wingside, 24 King perekule
            </Text>
          </View>
          <Text style={styles.addressTime}>22:05</Text>
        </View>
      </View>
    </View>
  );
};

const RideDetails = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header onClick={() => navigation.goBack()} bgk={colors.bkgLight} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Ride Details</Text>
        <Text style={styles.date}>29 April, 2024</Text>
        <View style={styles.img}>
          <Image style={styles.map} source={map} />
        </View>
        <View style={styles.card}>
          <Text style={styles.status}>Ride completed</Text>
          <Route />
        </View>
        <View style={styles.card}>
          <Text style={styles.status}>Driver</Text>
          <View style={styles.driverInfo}>
            <View style={styles.driverIcon}>
              <CustomIcon name="user" size={20} color={colors.neutralN900} />
            </View>
            <Text style={styles.name}>Kenneth</Text>
          </View>
          <View style={styles.vehicleInfo}>
            <View style={styles.info}>
              <Text style={styles.vehicleTitle}>License plate number</Text>
              <Text style={styles.vehicleValue}>ADT654 UYT</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.vehicleTitle}>Vehicle</Text>
              <Text style={styles.vehicleValue}>Toyota Yaris, Black</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.actionBtn}>
            <IconButton icon="call-1" size={26} onPress={() => {}} />
            <Text style={styles.actionText}>Call Driver</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="share-05" size={26} onPress={() => {}} />
            <Text style={styles.actionText}>Share ride</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="alert-01" size={26} onPress={() => {}} />
            <Text style={styles.actionText}>Safety</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.status}>Payment Method</Text>
          <View style={styles.ride}>
            <View style={styles.cash}>
              <CustomIcon
                name="cash-02"
                size={24}
                color={colors.brandPrimaryP950}
              />
              <Text style={styles.paymentText}>Cash</Text>
            </View>
            <View style={styles.cash}>
              <View style={styles.dot} />
              <Text style={styles.rideText}>Economy</Text>
            </View>
          </View>
          <View style={styles.price}>
            <View style={styles.item}>
              <Text style={styles.itemText}>Booking fee</Text>
              <Text style={styles.itemValue}>₦800</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>Discount</Text>
              <Text style={styles.itemValue}>₦0</Text>
            </View>
            <View style={styles.itemLine} />
            <View style={styles.item}>
              <Text style={styles.priceTotal}>Total</Text>
              <Text style={styles.priceTotal}>₦800</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RideDetails;

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
  date: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Regular,
    marginTop: 10,
  },
  map: {
    height: 100,
    width: '100%',
  },
  img: {
    marginTop: 15,
  },
  card: {
    backgroundColor: colors.containerBg,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  status: {
    fontSize: 18,
    color: colors.textDark,
    fontFamily: fonts.SemiBold,
  },
  route: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  circle: {
    backgroundColor: colors.brandPrimaryP800,
    height: 14,
    width: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: colors.containerBg,
    height: 4,
    width: 4,
    borderRadius: 2,
  },
  circleDes: {
    backgroundColor: colors.brandPrimaryBase,
    height: 14,
    width: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 60,
    width: 0.5,
    backgroundColor: colors.brandPrimaryP800,
    marginLeft: 7,
    zIndex: -1,
  },
  shape: {
    flex: 1,
  },
  timeContainer: {
    justifyContent: 'space-between',
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  addressTime: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.Regular,
  },
  driverIcon: {
    height: 36,
    width: 36,
    backgroundColor: colors.bkgLightAsh,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: colors.textDark,
    fontFamily: fonts.SemiBold,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  vehicleInfo: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
  },
  info: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.Regular,
  },
  vehicleValue: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  ride: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 15,
  },
  cash: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    backgroundColor: colors.textAsh,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paymentText: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  rideText: {
    fontSize: 14,
    color: colors.textAsh,
    fontFamily: fonts.Regular,
  },
  price: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLine: {
    backgroundColor: colors.neutralN300,
    width: '100%',
    height: 0.5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  itemValue: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
  priceTotal: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.SemiBold,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionCard: {
    backgroundColor: colors.containerBg,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  actionText: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: colors.textDarkAsh,
  },
});
