import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import CustomIcon from './CustomIcon';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import RecentPlaces from './RecentPlaces';
import {useNavigation} from '@react-navigation/native';

export type IWhereBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
};

const WhereBottomSheet = forwardRef<IWhereBottomSheet, Props>(
  ({onSubmit}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.close();
      },
      present() {
        BottomSheetRef.current?.collapse;
      },
    }));

    // const handleSubmitPress = () => {
    //   onSubmit();
    // };

    // // callbacks
    // const handlePresentModalPress = useCallback(() => {
    //   BottomSheetRef.current?.expand();
    // }, []);

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        index={0}
        // enableHandlePanningGesture={false}
        // enableContentPanningGesture={false}
        snapPoints={[170]}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.whereContainer}>
              <Pressable
                android_ripple={{
                  color: colors.neutralN300,
                }}
                style={({pressed}) => [
                  styles.whereTo,
                  pressed && Platform.OS === 'ios' ? {opacity: 0.7} : {},
                ]}
                onPress={() => navigation.navigate('Route')}>
                <CustomIcon
                  name="search"
                  size={20}
                  color={colors.neutralN300}
                />
                <Text style={styles.whereToText}>Where to?</Text>
              </Pressable>
            </View>
            <View style={styles.options}>
              <View style={styles.optionBtn}>
                <Pressable
                  android_ripple={{
                    color: colors.neutralN300,
                  }}
                  style={({pressed}) => [
                    styles.link,
                    pressed && Platform.OS === 'ios' ? {opacity: 0.7} : {},
                  ]}>
                  <CustomIcon
                    name="city-03"
                    size={20}
                    color={colors.neutralN300}
                  />
                  <Text style={styles.linkText}>Popular places</Text>
                </Pressable>
              </View>
              <View style={styles.optionBtn}>
                <Pressable
                  android_ripple={{
                    color: colors.neutralN300,
                  }}
                  style={({pressed}) => [
                    styles.link,
                    pressed && Platform.OS === 'ios' ? {opacity: 0.7} : {},
                  ]}>
                  <CustomIcon
                    name="time-schedule"
                    size={20}
                    color={colors.neutralN600}
                  />
                  <Text style={styles.linkText}>Schedule ride</Text>
                </Pressable>
              </View>
            </View>
            <RecentPlaces />
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
  whereContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  whereTo: {
    height: 48,
    backgroundColor: colors.bkgAsh,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  options: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  optionBtn: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  whereToText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.textDark,
  },
  link: {
    height: 50,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.neutralN600,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  linkText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.textDarkAsh,
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
  content: {
    flex: 1,
    gap: 20,
  },
});

export default WhereBottomSheet;
