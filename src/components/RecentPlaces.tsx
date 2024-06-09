import React from 'react';
import {StyleSheet, Platform, Text, Pressable, View} from 'react-native';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import CustomIcon from './CustomIcon';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';

let places = [
  {
    street: '58 Kan Saro-Wiwa Road',
    city: 'Port Harcourt',
    country: 'Nigeria',
  },
  {
    street: 'River State University',
    city: 'Port Harcourt',
    country: 'Nigeria',
  },
  {
    street: '23 Okokwu Street',
    city: 'Port Harcourt',
    country: 'Nigeria',
  },
  {
    street: 'Waterlines Bus Stop',
    city: 'Port Harcourt',
    country: 'Nigeria',
  },
];

type ItemProps = {
  street: string;
  city: string;
  country: string;
};

const MainItem = (props: {places: ItemProps[]}) => {
  return (
    <BottomSheetView style={styles.placesContainer}>
      {props.places.map((item: any, i: number) => (
        <Pressable
          key={i}
          android_ripple={{
            color: colors.neutralN300,
          }}
          style={({pressed}) => [
            styles.places,
            pressed && Platform.OS === 'ios' ? {opacity: 0.7} : {},
          ]}>
          <CustomIcon
            name="clock-01"
            color={colors.brandPrimaryBase}
            size={20}
          />
          <BottomSheetView>
            <Text style={styles.street}>{item.street}</Text>
            <Text style={styles.info}>
              {item.city}, {item.country}
            </Text>
          </BottomSheetView>
        </Pressable>
      ))}
    </BottomSheetView>
  );
};

export default function RecentPlaces({}: {}) {
  const placesGroup = (n: number) =>
    [...Array(Math.ceil(places.length / n))].map((el, i) =>
      places.slice(i * n, (i + 1) * n),
    );

  return (
    <View style={{flex: 1}}>
      <BottomSheetFlatList
        data={placesGroup(2)}
        renderItem={({item}) => <MainItem places={item} />}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placesContainer: {
    // width: per_width(65),
  },
  places: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    height: 48,
    backgroundColor: colors.brandPrimaryBase,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
  street: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textDark,
  },
  info: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: colors.textAsh,
  },
});
