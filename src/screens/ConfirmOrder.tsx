import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import FloatingButton from '../components/FloatingButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ConfirmOrderBottomSheet, {
  IConfirmOrderBottomSheet,
} from '../components/ConfirmOrderBottomSheet';
import LocationBottomSheet, {
  ILocationBottomSheet,
} from '../components/LocationBottomSheet';

const ConfirmOrder = ({navigation}: {navigation: any}) => {
  const mapView = useRef<MapView>(null);
  const {top} = useSafeAreaInsets();
  const confirmOrderRef = useRef<IConfirmOrderBottomSheet>(null);
  const selectLocationRef = useRef<ILocationBottomSheet>(null);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapPadding={{bottom: 180, top: 0, right: 0, left: 0}}
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
      <View style={[styles.nav, {top: top + 10}]}>
        <FloatingButton onPress={() => navigation.goBack()} />
      </View>
      <ConfirmOrderBottomSheet
        ref={confirmOrderRef}
        onSubmit={() => {}}
        onCollapse={() => selectLocationRef.current?.present()}
      />
      <LocationBottomSheet
        ref={selectLocationRef}
        onSelect={() => {}}
        onCollapse={() => confirmOrderRef.current?.present()}
      />
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
  nav: {
    position: 'absolute',
    paddingLeft: 20,
  },
});
