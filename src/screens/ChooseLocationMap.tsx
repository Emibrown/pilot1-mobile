import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import FloatingButton from '../components/FloatingButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LocationBottomSheet, {
  ILocationBottomSheet,
} from '../components/LocationBottomSheet';
import ChooseLocationBottomSheet, {
  IChooseLocationBottomSheet,
} from '../components/ChooseLocationBottomSheet';
import {Image} from 'react-native';
import {geoCodeFilter, getGeoCode} from '../services/apis';
import {IAppState, ICoord, ILocation} from '../states/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../res/constant';
import {UPDATE_RIDE} from '../states/ActionTypes';

const marker = require('../assets/icons8-marker.png');

const ChooseLocationMap = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const mapView = useRef<MapView>(null);
  const {top} = useSafeAreaInsets();
  const chooseLocationRef = useRef<IChooseLocationBottomSheet>(null);
  const selectLocationRef = useRef<ILocationBottomSheet>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [placesData, setPlacesData] = useState<ILocation>();
  const {pick_up, destination} = useSelector((state: IAppState) => state.ride);
  const {type} = route.params;
  const dispatch = useDispatch();

  const fetchGeoData = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true);
      for (let value of geoCodeFilter) {
        let response = await getGeoCode(lat, lng, value);
        if (response.data.results.length) {
          mapPlaces(response.data.results[0], {lat, lng});
          break;
        }
      }
    } catch (error) {
      // console.error('Error fetching data:', error);
      // Handle errors
    } finally {
      setLoading(false);
    }
  }, []);

  // const mapPlacesLog = async (places: any, filter: string) => {
  //   console.debug('/// New RESULT ///', filter);
  //   for (let place of places) {
  //     console.info(
  //       'mapPlacesLog',
  //       place.formatted_address,
  //       place.types,
  //       place.geometry.location_type,
  //       place.address_components,
  //     );
  //   }
  // };

  const mapPlaces = async (placeInfo: any, placeCoord: ICoord) => {
    let street = `${placeInfo.address_components[0].long_name}, ${placeInfo.address_components[1].long_name}`;
    if (placeInfo.address_components[0].types.includes('country')) {
      street = `${placeInfo.formatted_address.split(',')[0]}, ${
        placeInfo.address_components[1].long_name
      }`;
    }
    if (placeInfo.address_components[0].types.includes('plus_code')) {
      street = `${placeInfo.address_components[1].long_name}, ${placeInfo.address_components[2].long_name}`;
    }
    if (placeInfo.address_components[0].types.includes('street_number')) {
      street = `${street}, ${placeInfo.address_components[2].long_name}`;
    }
    const newPlaces = {
      street: street,
      city: placeInfo.formatted_address.split(',').slice(1).toString().trim(),
      placeId: placeInfo.place_id,
      coord: placeCoord,
    };
    setPlacesData(newPlaces);
  };

  const onRegionChange = useCallback(
    (region: any) => {
      if (loading) {
        fetchGeoData(region.latitude, region.longitude);
      }
    },
    [loading, fetchGeoData],
  );

  const onMapReady = useCallback(() => {
    const newPlace = type === 'From' ? pick_up : destination;
    setPlacesData(newPlace);
    mapView.current?.animateToRegion(
      {
        latitude: newPlace?.coord?.lat || 4.8472,
        longitude: newPlace?.coord?.lng || 6.9746,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      800,
    );
  }, [pick_up, destination, type]);

  const onSubmit = useCallback(() => {
    if (type === 'From') {
      dispatch({
        type: UPDATE_RIDE,
        payload: {
          pick_up: placesData,
        },
      });
      if (destination) {
        return navigation.replace('SelectRide');
      }
      return navigation.goBack();
    } else {
      dispatch({
        type: UPDATE_RIDE,
        payload: {
          destination: placesData,
        },
      });
      if (pick_up) {
        return navigation.replace('SelectRide');
      }
      return navigation.goBack();
    }
  }, [dispatch, placesData, type, destination, navigation, pick_up]);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapPadding={{bottom: 0, top: 0, right: 0, left: 0}}
        style={styles.mapStyle}
        ref={mapView}
        customMapStyle={MapStyle}
        onRegionChangeComplete={onRegionChange}
        onPanDrag={() => setLoading(true)}
        onMapReady={onMapReady}
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={marker} />
      </View>
      <View style={[styles.nav, {top: top + 10}]}>
        <FloatingButton onPress={() => navigation.goBack()} />
      </View>
      <ChooseLocationBottomSheet
        ref={chooseLocationRef}
        onSubmit={onSubmit}
        onCollapse={() => selectLocationRef.current?.present()}
        street={placesData?.street}
        loading={loading}
        text={type === 'From' ? 'pickup' : 'destination'}
      />
      <LocationBottomSheet
        ref={selectLocationRef}
        onCollapse={() => chooseLocationRef.current?.present()}
      />
    </View>
  );
};

export default ChooseLocationMap;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
  nav: {
    position: 'absolute',
    paddingLeft: 20,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
});
