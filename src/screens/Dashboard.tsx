import React, {useEffect, useRef} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import SetLocation, {ISetLocation} from '../components/SetLocation';
import WhereBottomSheet, {
  IWhereBottomSheet,
} from '../components/WhereBottomSheet';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapStyle from '../raw/mapStyle.json';
import DrawerButton from '../components/DrawerButton';
import RouteBottomSheet, {
  IRouteBottomSheet,
} from '../components/RouteBottomSheet';

const Dashboard = ({navigation}: {navigation: any}) => {
  const setLocationRef = useRef<ISetLocation>(null);
  const whereBottomSheetRef = useRef<IWhereBottomSheet>(null);
  const RouteSheetRef = useRef<IRouteBottomSheet>(null);
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    setTimeout(() => {
      setLocationRef.current?.present();
      whereBottomSheetRef.current?.present();
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        mapPadding={{bottom: 170, top: 0, right: 0, left: 0}}
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
      <WhereBottomSheet
        ref={whereBottomSheetRef}
        onSubmit={() => {}}
        setRoute={() => RouteSheetRef.current?.present()}
      />
      <SetLocation ref={setLocationRef} onSubmit={() => {}} />
      <RouteBottomSheet ref={RouteSheetRef} onCollapse={() => {}} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
