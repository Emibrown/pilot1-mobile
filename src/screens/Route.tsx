import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import LocationInput from '../components/LocationInput';
import SearchPlaces from '../components/SearchPlaces';

const Route = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header title="Enter Route" icon="cancel-01" />
      <View style={styles.top}>
        <View style={styles.input}>
          <LocationInput
            placeholder="Search Pick-up location"
            onChangeText={() => {}}
            type="From"
          />
          <LocationInput
            placeholder="Destination"
            onChangeText={() => {}}
            type="To"
          />
        </View>
      </View>
      <SearchPlaces onSelect={v => navigation.navigate('SelectRide', v)} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Route;
