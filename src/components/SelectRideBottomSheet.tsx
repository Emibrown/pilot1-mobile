import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import Button from './Button';
import RidePicker from './RidePicker';
import {rideProps} from './RidePicker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from './CustomIcon';
import {fonts} from '../res/fonts';

export type ISelectRideBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
};

const CONTENT_HEIGHT = 190;

const SelectRideBottomSheet = forwardRef<ISelectRideBottomSheet, Props>(
  ({}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation();
    const [selectedRide, setSelectedRide] = useState<rideProps | null>(null);
    const dragY = useSharedValue(CONTENT_HEIGHT);
    const snapPoints = useMemo(() => [350, '95%'], []);
    const [sheetIndex, setSheetIndex] = useState<number>(0);

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.close();
      },
      present() {
        BottomSheetRef.current?.collapse();
      },
    }));

    // renders
    const renderFooter = useCallback(
      (props: any) => (
        <BottomSheetFooter {...props} bottomInset={0}>
          <View style={styles.footerContainer}>
            <View style={styles.payment}>
              <CustomIcon
                name="cash-02"
                size={24}
                color={colors.brandPrimaryP950}
              />
              <Text style={styles.paymentText}>Cash</Text>
              <CustomIcon
                name="arrow-right-01-round-1"
                size={24}
                color={colors.brandPrimaryP950}
              />
            </View>
            <Button
              text={`Select ${selectedRide ? selectedRide.title : 'Economy'}`}
              onPress={() => navigation.navigate('ConfirmOrder')}
            />
          </View>
        </BottomSheetFooter>
      ),
      [selectedRide, navigation],
    );

    // callbacks
    const handleSheetChanges = useCallback(
      (index: number) => {
        setSheetIndex(index);
        if (index === 1) {
          dragY.value = withTiming(700);
        } else {
          dragY.value = withTiming(CONTENT_HEIGHT);
        }
      },
      [dragY],
    );

    const sheetContainer = useAnimatedStyle(() => {
      return {
        height: dragY.value,
      };
    });

    const onSelect = useCallback(
      (v: any) => {
        dragY.value = CONTENT_HEIGHT;
        BottomSheetRef.current?.collapse();
        setSelectedRide(v);
      },
      [BottomSheetRef, dragY],
    );

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        index={0}
        onChange={handleSheetChanges}
        enableOverDrag={false}
        snapPoints={snapPoints}
        footerComponent={renderFooter}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <Animated.View style={[sheetContainer, {overflow: 'scroll'}]}>
            <RidePicker
              selectedIndex="1"
              sheetIndex={sheetIndex}
              onSelect={onSelect}
            />
          </Animated.View>
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
  },
  footerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  payment: {
    flexDirection: 'row',
    backgroundColor: colors.neutralN100,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.Medium,
  },
});

export default SelectRideBottomSheet;
