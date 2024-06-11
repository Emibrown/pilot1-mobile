import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import DrawerButton from '../components/DrawerButton';
import ConnectDriverBottomSheet, {
  IConnectDriverBottomSheet,
} from '../components/ConnectDriverBottomSheet';

const ConnectDriver = ({navigation}: {navigation: any}) => {
  const mapView = useRef<MapView>(null);
  const DriverSheetRef = useRef<IConnectDriverBottomSheet>(null);

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
      <DrawerButton onPress={() => navigation.openDrawer()} />
      <ConnectDriverBottomSheet ref={DriverSheetRef} onSubmit={() => {}} />
    </View>
  );
};

export default ConnectDriver;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
  nav: {
    position: 'absolute',
    paddingLeft: 20,
  },
});
