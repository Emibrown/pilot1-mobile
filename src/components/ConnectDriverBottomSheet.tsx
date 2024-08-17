import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import LoaderBar from './LoaderBar';
import IconButton from './IconButton';
import {LocationIcon} from './LocationInput';
import CustomIcon from './CustomIcon';
import Avatar from './Avatar';
import {useSelector} from 'react-redux';
import {IAppState} from '../states/interfaces';

export type IConnectDriverBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
};

const ConnectDriverBottomSheet = forwardRef<IConnectDriverBottomSheet, Props>(
  ({}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const [driverConnect, setDriverConnect] = useState<boolean>(false);
    const [minSnapPoints, setMinSnapPoints] = useState<number>(250);
    const {pick_up, destination} = useSelector(
      (state: IAppState) => state.ride,
    );

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.close();
      },
      present() {
        BottomSheetRef.current?.collapse;
      },
    }));

    useEffect(() => {
      setTimeout(() => {
        setDriverConnect(true);
        setMinSnapPoints(290);
      }, 8000);
    }, []);

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        index={0}
        snapPoints={[minSnapPoints, '75%']}>
        <BottomSheetScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          style={styles.contentContainer}>
          <View style={styles.status}>
            <Text style={styles.statusText}>
              {!driverConnect
                ? 'Connecting to driver...'
                : 'Arriving in 5 mins'}{' '}
            </Text>
            {!driverConnect && (
              <>
                <Text style={styles.statusInfo}>
                  Your driver will be on the way as soon as they confirm.
                </Text>
                <View style={styles.loader}>
                  <LoaderBar />
                </View>
                <View style={styles.action}>
                  <View style={styles.actionBtn}>
                    <IconButton icon="cancel-02" size={24} onPress={() => {}} />
                    <Text style={styles.cancelText}>Cancel ride</Text>
                  </View>
                </View>
              </>
            )}
            {driverConnect && (
              <View>
                <View style={styles.rideInfo}>
                  <View style={styles.driver}>
                    <Avatar size={55} />
                    <View style={styles.driverInfo}>
                      <Text style={styles.driverName}>Emibrown</Text>
                      <View style={styles.rating}>
                        <CustomIcon
                          name="star_fill"
                          size={18}
                          color={colors.brandPrimaryBase}
                        />
                        <Text style={styles.ratingText}>5.0</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.vehicle}>
                    <Text style={styles.plateNumber}>ADT654 UYT</Text>
                    <Text style={styles.vehicleName}>Toyota Camry, Black</Text>
                  </View>
                </View>
                <View style={styles.rideAction}>
                  <View style={styles.actionBtn}>
                    <IconButton icon="call-1" size={26} onPress={() => {}} />
                    <Text style={styles.cancelText}>Call Driver</Text>
                  </View>
                  <View style={styles.actionBtn}>
                    <IconButton icon="share-05" size={26} onPress={() => {}} />
                    <Text style={styles.cancelText}>Share ride</Text>
                  </View>
                  <View style={styles.actionBtn}>
                    <IconButton icon="alert-01" size={26} onPress={() => {}} />
                    <Text style={styles.cancelText}>Safety</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>My Route</Text>
            <View style={styles.routeFrom}>
              <LocationIcon size={17} />
              <Text numberOfLines={2} style={styles.from}>
                {pick_up?.street}
              </Text>
              <IconButton icon="edit-02" size={16} onPress={() => {}} />
            </View>
            <View style={styles.line} />
            <View style={styles.routeTo}>
              <CustomIcon
                name="location-06"
                size={19}
                color={colors.brandPrimaryBase}
              />
              <Text numberOfLines={2} style={styles.from}>
                {destination?.street}
              </Text>
              <IconButton icon="edit-02" size={16} onPress={() => {}} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Payment Method</Text>
            <Text style={styles.rideType}>Economy</Text>
            <View style={styles.price}>
              <CustomIcon
                name="cash-02"
                size={24}
                color={colors.brandPrimaryP950}
              />
              <Text style={styles.paymentType}>Cash</Text>
              <Text style={styles.priceText}>N1,000</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>More</Text>
            <View style={styles.moreBtn}>
              <CustomIcon
                name="cancel-02"
                size={24}
                color={colors.neutralN600}
              />
              <Text style={styles.cancel}>Cancel ride</Text>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.neutralN100,
    width: 122,
    height: 8,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.bkgLightAsh,
  },
  status: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
    backgroundColor: 'white',
  },
  statusText: {
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.brandPrimaryP950,
  },
  statusInfo: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textDarkAsh,
  },
  loaderIn: {
    width: '100%',
    backgroundColor: colors.brandPrimaryP50,
    borderRadius: 10,
  },
  loaderOut: {
    width: '40%',
    height: 5,
    backgroundColor: colors.brandPrimaryBase,
    borderRadius: 10,
  },
  loader: {
    paddingTop: 10,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  rideAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  cancelText: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: colors.textDarkAsh,
  },
  actionBtn: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  routeFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // marginBottom: -6,
    // backgroundColor: 'red',
  },
  routeTo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // marginTop: -7,
    // backgroundColor: 'red',
  },
  from: {
    flex: 1,
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textDark,
  },
  line: {
    height: 30,
    borderStyle: 'dashed',
    borderLeftWidth: 1,
    borderLeftColor: colors.brandPrimaryP800,
    marginLeft: 8.4,
    marginTop: -5,
    marginBottom: -5,
    // marginVertical: 2,
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 5,
  },
  rideType: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textAsh,
  },
  paymentType: {
    flex: 1,
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.textDark,
  },
  priceText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: colors.textDark,
  },
  rating: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  driver: {
    flexDirection: 'row',
    gap: 15,
  },
  driverInfo: {
    justifyContent: 'center',
  },
  driverName: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.textDark,
  },
  ratingText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: colors.textAsh,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.bkgAsh,
  },
  vehicle: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  plateNumber: {
    alignSelf: 'flex-start',
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: colors.textDark,
    backgroundColor: colors.neutralN100,
    textAlign: 'center',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  vehicleName: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textDarkAsh,
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cancel: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.textDark,
  },
});

export default ConnectDriverBottomSheet;
