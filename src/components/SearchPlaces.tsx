import React from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  Pressable,
  View,
  FlatList,
} from 'react-native';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';
import CustomIcon from './CustomIcon';

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

export interface ISearchPlaces {
  onSelect: (v: ItemProps) => void;
}

const MainItem = (props: {
  place: ItemProps;
  onSelect: (v: ItemProps) => void;
}) => {
  return (
    <Pressable
      android_ripple={{
        color: colors.neutralN100,
      }}
      onPress={() => props.onSelect(props.place)}
      style={({pressed}) => [
        styles.places,
        pressed && Platform.OS === 'ios'
          ? {backgroundColor: colors.neutralN100}
          : {},
      ]}>
      <CustomIcon name="clock-01" color={colors.neutralN600} size={20} />
      <View style={styles.text}>
        <Text style={styles.street}>{props.place.street}</Text>
        <Text style={styles.info}>
          {props.place.city}, {props.place.country}
        </Text>
      </View>
    </Pressable>
  );
};

export default function SearchPlaces({onSelect}: ISearchPlaces) {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={places}
        renderItem={({item}) => (
          <MainItem place={item} onSelect={v => onSelect(v)} />
        )}
        keyExtractor={(item, i) => i.toString()}
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
    paddingHorizontal: 15,
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
    gap: 5,
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
