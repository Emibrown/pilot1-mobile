import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import IconButton from './IconButton';
import Button from './Button';

export type IChooseLocationBottomSheet = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
  onCollapse: () => void;
  text: string;
  loading?: boolean;
  street?: string;
};

const ChooseLocationBottomSheet = forwardRef<IChooseLocationBottomSheet, Props>(
  ({onSubmit, onCollapse, text, loading = false, street}, ref) => {
    const BottomSheetRef = useRef<BottomSheet>(null);
    const [height, setHeight] = useState<number>(100);

    useImperativeHandle(ref, () => ({
      close() {
        BottomSheetRef.current?.collapse();
      },
      present() {
        BottomSheetRef.current?.expand();
      },
    }));

    const handleSubmitPress = () => {
      onSubmit();
    };

    const onChange = (index: number) => {
      if (index === 0) {
        onCollapse();
      }
    };

    const snapPoints = useMemo(() => [1, height], [height]);

    const onLayout = useCallback((event: any) => {
      setHeight(event.nativeEvent.layout.height + 30);
    }, []);

    return (
      <BottomSheet
        style={styles.sheet}
        ref={BottomSheetRef}
        handleComponent={null}
        index={1}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        onChange={onChange}
        snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          <View onLayout={onLayout}>
            <View
              style={[
                styles.route,
                loading ? styles.disabled : styles.enabled,
              ]}>
              <View style={styles.textBox}>
                <Text style={styles.routeText} numberOfLines={2}>
                  {street || 'Port Harcourt'}
                </Text>
              </View>
              <IconButton
                icon="search"
                onPress={() => BottomSheetRef.current?.collapse()}
              />
            </View>
            {!street && (
              <View
                style={[
                  styles.info,
                  loading ? styles.disabled : styles.enabled,
                ]}>
                <Text style={styles.infoText}>
                  Move the map to set Precise location
                </Text>
              </View>
            )}
            <View style={styles.btn}>
              <Button
                text={`Confirm ${text}`}
                disabled={!street}
                primary
                onPress={handleSubmitPress}
              />
            </View>
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
      height: -1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.3,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.neutralN100,
    width: 122,
    height: 8,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  route: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBox: {
    flex: 1,
  },
  routeText: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
    color: colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textLight,
  },
  subInfoText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    color: colors.textDarkAsh,
  },
  image: {
    width: 30,
    resizeMode: 'contain',
  },
  btn: {
    paddingVertical: 10,
  },
});

export default ChooseLocationBottomSheet;
