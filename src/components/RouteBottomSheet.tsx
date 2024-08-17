import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {colors} from '../res/colors';
import SearchPlaces from './SearchPlaces';
import Header from './Header';
import LocationInput, {ILocationInput} from './LocationInput';
import {useNavigation} from '@react-navigation/native';
import {getPlace, getPlaceDetails} from '../services/apis';
import {IAppState, ILocation} from '../states/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_RIDE} from '../states/ActionTypes';

export type IRouteBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onCollapse: () => void;
  closeOnSelect?: boolean;
};

const RouteBottomSheet = forwardRef<IRouteBottomSheet, Props>(
  ({onCollapse, closeOnSelect = false}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const FromRef = useRef<ILocationInput>(null);
    const ToRef = useRef<ILocationInput>(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [placesFromData, setPlacesFromData] = useState<ILocation[]>([]);
    const [placesToData, setPlacesToData] = useState<ILocation[]>([]);
    const dispatch = useDispatch();
    const {pick_up, destination} = useSelector(
      (state: IAppState) => state.ride,
    );
    const [fromFocus, setFromFocus] = useState<boolean>(false);
    const [toFocus, setToFocus] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.collapse();
      },
      present() {
        BottomSheetRef.current?.expand();
      },
    }));

    const onChange = (index: number) => {
      if (index === 0) {
        onCollapse();
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      } else {
        FromRef.current?.focus();
      }
    };

    const fetchPlaceData = async (text: string) => {
      try {
        setLoading(true);
        const response = await getPlace(text);
        await mapPlaces(response.data.predictions);
      } catch (error) {
        // console.error('Error fetching data:', error);
        // Handle errors
      } finally {
        setLoading(false);
      }
    };

    const mapPlaces = async (places: any) => {
      let newPlaces: ILocation[] = [];
      for (let place of places) {
        const response = await getPlaceDetails(place?.place_id);
        const coord = response.data.result.geometry.location;
        newPlaces = [
          ...newPlaces,
          {
            street: place.description.split(',')[0],
            city: place.description.split(',').slice(1).toString().trim(),
            placeId: place.place_id,
            coord,
          },
        ];
      }
      if (FromRef.current?.isFocused()) {
        setPlacesFromData(newPlaces);
      }
      if (ToRef.current?.isFocused()) {
        setPlacesToData(newPlaces);
      }
    };

    const onSelect = useCallback(
      (place: ILocation) => {
        if (fromFocus) {
          dispatch({
            type: UPDATE_RIDE,
            payload: {
              pick_up: place,
            },
          });
          if (destination?.street) {
            if (closeOnSelect) {
              return BottomSheetRef.current?.collapse();
            }
            return navigation.navigate('SelectRide');
          }
          return ToRef.current?.focus();
        } else if (toFocus) {
          dispatch({
            type: UPDATE_RIDE,
            payload: {
              destination: place,
            },
          });
          if (pick_up?.street) {
            if (closeOnSelect) {
              return BottomSheetRef.current?.collapse();
            }
            return navigation.navigate('SelectRide');
          }
          return FromRef.current?.focus();
        }
      },
      [
        dispatch,
        fromFocus,
        toFocus,
        navigation,
        pick_up?.street,
        destination?.street,
        closeOnSelect,
      ],
    );

    const placeData = useMemo(() => {
      if (fromFocus) {
        return placesFromData;
      } else if (toFocus) {
        return placesToData;
      }
    }, [fromFocus, toFocus, placesFromData, placesToData]);

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleComponent={null}
        index={-1}
        enableOverDrag={false}
        onChange={onChange}
        snapPoints={[1, '100%']}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.container}>
            <Header
              onClick={() => BottomSheetRef.current?.collapse()}
              title="Enter Route"
              icon="cancel-01"
            />
            <View style={styles.top}>
              <View style={styles.input}>
                <LocationInput
                  ref={FromRef}
                  placeholder="Search Pick-up location"
                  onChangeText={text => fetchPlaceData(text)}
                  type="From"
                  onFocus={() => {
                    setFromFocus(true);
                    setToFocus(false);
                    fetchPlaceData(pick_up?.street || '');
                  }}
                  value={pick_up?.street}
                  onClear={() => {
                    dispatch({
                      type: UPDATE_RIDE,
                      payload: {
                        pick_up: null,
                      },
                    });
                  }}
                />
                <LocationInput
                  ref={ToRef}
                  placeholder="Destination"
                  onChangeText={text => fetchPlaceData(text)}
                  type="To"
                  onFocus={() => {
                    setToFocus(true);
                    setFromFocus(false);
                    fetchPlaceData(destination?.street || '');
                  }}
                  value={destination?.street}
                  onClear={() => {
                    dispatch({
                      type: UPDATE_RIDE,
                      payload: {
                        destination: null,
                      },
                    });
                  }}
                />
              </View>
            </View>
            <SearchPlaces
              onSelect={onSelect}
              isLoading={loading}
              placeData={placeData}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.neutralN100,
    width: 122,
    height: 8,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
  },
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

export default RouteBottomSheet;
