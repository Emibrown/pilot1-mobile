import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import IconButton from './IconButton';
import {Image} from 'react-native';
import Button from './Button';

const car1 = require('../assets/car1.png');

export type IConfirmOrderBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
  onCollapse: () => void;
};

const ConfirmOrderBottomSheet = forwardRef<IConfirmOrderBottomSheet, Props>(
  ({onSubmit, onCollapse}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.collapse();
      },
      present() {
        BottomSheetRef.current?.expand();
      },
    }));

    const handleSubmitPress = () => {
      onSubmit();
    };

    const onChange = (index: number) => {
      if (index === 0) {
        onCollapse();
      }
    };

    // // callbacks
    // const handlePresentModalPress = useCallback(() => {
    //   BottomSheetRef.current?.expand();
    // }, []);

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleComponent={null}
        index={1}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        onChange={onChange}
        snapPoints={[1, 180]}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.route}>
            <Text style={styles.routeText}>78 Woji road</Text>
            <IconButton
              icon="search"
              onPress={() => BottomSheetRef.current?.collapse()}
            />
          </View>
          <View style={styles.info}>
            <Image style={styles.image} source={car1} />
            <Text style={styles.infoText}>
              Economy - <Text style={styles.subInfoText}>N800</Text>
            </Text>
          </View>
          <Button text="Confirm Order" primary onPress={handleSubmitPress} />
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
      height: -1,
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeText: {
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textLight,
  },
  subInfoText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: colors.textDarkAsh,
  },
  image: {
    width: 30,
    resizeMode: 'contain',
  },
});

export default ConfirmOrderBottomSheet;
