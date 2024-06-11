import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import SearchPlaces from './SearchPlaces';
import SearchInput, {ISearchInput} from './SearchInput';

export type ILocationBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onCollapse: () => void;
};

const LocationBottomSheet = forwardRef<ILocationBottomSheet, Props>(
  ({onCollapse}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const SearchInputRef = useRef<ISearchInput>(null);

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.collapse();
      },
      present() {
        BottomSheetRef.current?.expand();
      },
    }));

    // const handleSubmitPress = () => {
    //   onSubmit();
    // };

    const onChange = (index: number) => {
      if (index === 0) {
        onCollapse();
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      } else {
        SearchInputRef.current?.focus();
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
        handleIndicatorStyle={styles.handleIndicatorStyle}
        index={-1}
        // keyboardBehavior="interactive"
        // android_keyboardInputMode="adjustResize"
        // keyboardBlurBehavior="restore"
        // enableHandlePanningGesture={false}
        // enableContentPanningGesture={false}
        onChange={onChange}
        snapPoints={[1, '95%']}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.input}>
            <SearchInput
              ref={SearchInputRef}
              placeholder="Search pick-up location"
              onChangeText={() => {}}
            />
          </View>
          <SearchPlaces onSelect={() => BottomSheetRef.current?.collapse()} />
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
  input: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

export default LocationBottomSheet;
