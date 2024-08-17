import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Platform, Text, Pressable, View, Image} from 'react-native';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import {ImageSourcePropType} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const car1 = require('../assets/car1.png');
const car2 = require('../assets/car2.png');
const car3 = require('../assets/car3.png');
const car4 = require('../assets/car4.png');
const car5 = require('../assets/car5.png');
const car6 = require('../assets/car6.png');

let rides = [
  {
    id: '1',
    icon: car1,
    title: 'Economy',
    price: 1000,
    discountPrice: 800,
    seat: 5,
    time: 5,
  },
  {
    id: '2',
    icon: car6,
    title: 'Premium',
    price: 2500,
    discountPrice: 2000,
    seat: 5,
    time: 5,
  },
  {
    id: '3',
    icon: car5,
    title: 'SUVs',
    price: 7000,
    discountPrice: 5500,
    seat: 5,
    time: 5,
  },
  {
    id: '4',
    icon: car2,
    title: 'Delivery',
    price: 1500,
    discountPrice: 1200,
    seat: 0,
    time: 5,
  },
  {
    id: '5',
    icon: car4,
    title: 'Tricycle(Keke)',
    price: 600,
    discountPrice: 300,
    seat: 3,
    time: 5,
  },
  {
    id: '6',
    icon: car3,
    title: 'Heavy duty (Trucks)',
    price: 10000,
    discountPrice: 8500,
    seat: 1,
    time: 5,
  },
];

export type rideProps = {
  id: string;
  icon: ImageSourcePropType;
  title: string;
  price: number;
  discountPrice: number;
  seat: number;
  time: number;
};

const MainItem = (props: {
  ride: rideProps;
  selected: string;
  onSelect: (v: rideProps) => void;
}) => {
  const handleSelect = useCallback(
    (ride: rideProps) => {
      props.onSelect(ride);
    },
    [props],
  );

  return (
    <Pressable
      onPress={() => handleSelect(props.ride)}
      style={({pressed}) => [
        styles.ride,
        pressed && Platform.OS === 'ios'
          ? {backgroundColor: colors.neutralN100}
          : {},
        props.selected === props.ride.id
          ? styles.rideSelected
          : styles.rideNotSelected,
      ]}>
      <Image style={styles.image} source={props.ride.icon} />
      <View style={styles.text}>
        <Text style={styles.title}>{props.ride.title}</Text>
        <View style={styles.timeInfo}>
          <Text style={styles.time}>{props.ride.seat} Seats</Text>
          <Text style={styles.time}>{props.ride.seat}mins</Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.discountPrice}>N{props.ride.discountPrice}</Text>
        <Text style={styles.price}>N{props.ride.price}</Text>
      </View>
    </Pressable>
  );
};

export default function RidePicker({
  selectedIndex,
  onSelect,
  sheetIndex,
}: {
  selectedIndex: string;
  onSelect: (v: rideProps) => void;
  sheetIndex: number;
}) {
  const [selected, setSelected] = useState<string>(selectedIndex);
  const flatListRef = useRef<any>(null);
  const handleSelect = useCallback(
    async (v: rideProps) => {
      setSelected(v.id);
      await onSelect(v);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: parseInt(v.id) - 1,
        });
      }, 200);
    },
    [onSelect, flatListRef],
  );

  useEffect(() => {
    if (sheetIndex === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: parseInt(selected) - 1,
        });
      }, 200);
    }
  }, [sheetIndex, selected]);

  return (
    <FlatList
      ref={flatListRef}
      data={rides}
      renderItem={({item}) => (
        <MainItem
          ride={item}
          selected={selected}
          onSelect={v => handleSelect(v)}
        />
      )}
      keyExtractor={(item, i) => i.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  placesContainer: {
    // width: per_width(65),
  },
  title: {
    color: colors.textDark,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
  time: {
    color: colors.textLight,
    fontFamily: fonts.Regular,
    fontSize: 12,
  },
  ride: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  rideNotSelected: {
    backgroundColor: colors.bkgLightAsh,
    borderWidth: 0,
  },
  rideSelected: {
    backgroundColor: colors.brandSecondaryS200,
    borderWidth: 0.5,
    borderColor: colors.brandPrimaryBase,
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
  text: {
    padding: 0,
    // gap: 2,
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
  image: {
    width: 40,
    resizeMode: 'contain',
  },
  priceInfo: {
    flex: 1,
    alignItems: 'flex-end',
    // gap: 5,
  },
  timeInfo: {
    flexDirection: 'row',
    gap: 5,
  },
  discountPrice: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: colors.brandPrimaryP950,
  },
  price: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
});
