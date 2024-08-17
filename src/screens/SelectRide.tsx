import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import SelectRideBottomSheet, {
  ISelectRideBottomSheet,
} from '../components/SelectRideBottomSheet';
import TopBar from '../components/TopBar';
import RouteBottomSheet, {
  IRouteBottomSheet,
} from '../components/RouteBottomSheet';
import {IAppState} from '../states/interfaces';
import {useSelector} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../res/constant';

const SelectRide = ({}, {}) => {
  const selectRideBottomSheetRef = useRef<ISelectRideBottomSheet>(null);
  const RouteSheetRef = useRef<IRouteBottomSheet>(null);
  const mapView = useRef<MapView>(null);
  const {pick_up, destination} = useSelector((state: IAppState) => state.ride);
  const [from, setFrom] = useState<any>();
  const [to, setTo] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      selectRideBottomSheetRef.current?.present();
    }, 1000);
  }, []);

  const fetchPickUpDetails = useCallback(async () => {
    if (pick_up?.coord) {
      setFrom({
        latitude: pick_up.coord.lat,
        longitude: pick_up.coord.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [pick_up?.coord]);

  const fetchDestinationDetails = useCallback(async () => {
    if (destination?.coord) {
      setTo({
        latitude: destination.coord.lat,
        longitude: destination.coord.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [destination?.coord]);

  useEffect(() => {
    fetchPickUpDetails();
  }, [fetchPickUpDetails]);

  useEffect(() => {
    fetchDestinationDetails();
  }, [fetchDestinationDetails]);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapPadding={{bottom: 350, top: 0, right: 0, left: 0}}
        style={styles.mapStyle}
        ref={mapView}
        customMapStyle={MapStyle}
        initialRegion={from}>
        {from !== undefined && <Marker coordinate={from} />}
        {to !== undefined && <Marker coordinate={to} />}
        {from != undefined && to != undefined ? (
          <MapViewDirections
            origin={from}
            destination={to}
            apikey={GOOGLE_API_KEY}
            strokeColor="hotpink"
            strokeWidth={4}
            onReady={result => {
              mapView?.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 100,
                  right: 50,
                  bottom: 50,
                  left: 50,
                },
              });
            }}
          />
        ) : null}
      </MapView>
      <TopBar onEdit={() => RouteSheetRef.current?.present()} />
      <SelectRideBottomSheet
        ref={selectRideBottomSheetRef}
        onSubmit={() => {}}
      />
      <RouteBottomSheet
        ref={RouteSheetRef}
        onCollapse={() => {}}
        closeOnSelect={true}
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
