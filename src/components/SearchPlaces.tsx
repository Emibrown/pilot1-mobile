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
import {FadeLoading} from 'react-native-fade-loading';
import {ILocation} from '../states/interfaces';

export interface ISearchPlaces {
  onSelect: (v: ILocation) => void;
  isLoading?: boolean;
  placeData?: ILocation[];
}

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View
        style={{
          height: 20,
          width: 20,
        }}>
        <FadeLoading
          animated
          children={<View style={{height: 10, width: 10}} />}
          visible
          style={{}}
          primaryColor={colors.bkgLightAsh}
          secondaryColor={colors.bkgAsh}
          duration={3000}
        />
      </View>
      <View style={{flex: 1, gap: 5}}>
        <View
          style={{
            height: 15,
            width: '100%',
          }}
          children={
            <FadeLoading
              animated
              children={<View style={{height: 5}} />}
              visible
              style={{}}
              primaryColor={colors.bkgLightAsh}
              secondaryColor={colors.bkgAsh}
              duration={3000}
            />
          }
        />
        <View
          style={{
            height: 10,
            width: '60%',
          }}
          children={
            <FadeLoading
              animated
              children={<View style={{flex: 1}} />}
              visible
              style={{}}
              primaryColor={colors.bkgLightAsh}
              secondaryColor={colors.bkgAsh}
              duration={3000}
            />
          }
        />
      </View>
    </View>
  );
};

const MainItem = (props: {
  place: ILocation;
  onSelect: (v: ILocation) => void;
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
      <CustomIcon name="location-06" color={colors.neutralN600} size={20} />
      <View style={styles.text}>
        <Text style={styles.street} numberOfLines={1}>
          {props.place.street}
        </Text>
        <Text numberOfLines={1} style={styles.info}>
          {props.place.city}
        </Text>
      </View>
    </Pressable>
  );
};

export default function SearchPlaces({
  onSelect,
  isLoading = false,
  placeData = [],
}: ISearchPlaces) {
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        Array.from(Array(5).keys()).map((key, index) => <Loader key={index} />)
      ) : (
        <FlatList
          data={placeData}
          renderItem={({item}) => (
            <MainItem place={item} onSelect={v => onSelect(v)} />
          )}
          keyExtractor={(item, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
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
    flex: 1,
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
  loaderContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
