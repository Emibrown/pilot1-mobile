import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import SearchPlaces from './SearchPlaces';
import Header from './Header';
import LocationInput, {ILocationInput} from './LocationInput';
import {useNavigation} from '@react-navigation/native';

export type IRouteBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onCollapse: () => void;
};

const RouteBottomSheet = forwardRef<IRouteBottomSheet, Props>(
  ({onCollapse}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const FromRef = useRef<ILocationInput>(null);
    const ToRef = useRef<ILocationInput>(null);
    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.collapse();
      },
      present() {
        BottomSheetRef.current?.expand();
      },
    }));

    const onChange = (index: number) => {
      if (index === 0) {
        onCollapse();
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      } else {
        FromRef.current?.focus();
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
        index={-1}
        enableOverDrag={false}
        onChange={onChange}
        snapPoints={[1, '100%']}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.container}>
            <Header
              onClick={() => BottomSheetRef.current?.collapse()}
              title="Enter Route"
              icon="cancel-01"
            />
            <View style={styles.top}>
              <View style={styles.input}>
                <LocationInput
                  ref={FromRef}
                  placeholder="Search Pick-up location"
                  onChangeText={() => {}}
                  type="From"
                />
                <LocationInput
                  ref={ToRef}
                  placeholder="Destination"
                  onChangeText={() => {}}
                  type="To"
                />
              </View>
            </View>
            <SearchPlaces onSelect={v => navigation.navigate('SelectRide')} />
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  input: {
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: '#fff',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RouteBottomSheet;
