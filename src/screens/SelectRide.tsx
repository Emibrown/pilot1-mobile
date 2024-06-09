import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import SelectRideBottomSheet, {
  ISelectRideBottomSheet,
} from '../components/SelectRideBottomSheet';
import TopBar from '../components/TopBar';

const SelectRide = ({navigation}: {navigation: any}) => {
  const selectRideBottomSheetRef = useRef<ISelectRideBottomSheet>(null);
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    setTimeout(() => {
      selectRideBottomSheetRef.current?.present();
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapPadding={{bottom: 300, top: 0, right: 0, left: 0}}
        style={styles.mapStyle}
        ref={mapView}
        showsUserLocation={true}
        followsUserLocation={true}
        customMapStyle={MapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TopBar />
      <SelectRideBottomSheet
        ref={selectRideBottomSheetRef}
        onSubmit={() => {}}
      />
    </View>
  );
};

export default SelectRide;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
