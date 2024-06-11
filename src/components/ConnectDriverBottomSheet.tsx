import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import LoaderBar from './LoaderBar';

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

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.close();
      },
      present() {
        BottomSheetRef.current?.collapse;
      },
    }));

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        index={0}
        // enableHandlePanningGesture={false}
        // enableContentPanningGesture={false}
        snapPoints={['30%', '90%']}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.status}>
            <Text style={styles.statusText}>Connecting to driver...</Text>
            <Text style={styles.statusInfo}>
              Your driver will be on the way as soon as they confirm.
            </Text>
          </View>
          <View style={styles.loader}>
            <LoaderBar />
          </View>
        </BottomSheetView>
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
  status: {
    paddingTop: 10,
    paddingHorizontal: 20,
    gap: 8,
  },
  statusText: {
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.brandPrimaryP950,
  },
  statusInfo: {
    fontFamily: fonts.Regular,
    fontSize: 16,
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default ConnectDriverBottomSheet;
