import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';
import IconButton from './IconButton';
import {Image} from 'react-native';

const img = require('../assets/maps-location.png');

export type ISetLocation = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
};

const SetLocation = forwardRef<ISetLocation, Props>(({onSubmit}, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    close() {
      setOpen(false);
    },
    present() {
      setOpen(true);
    },
  }));

  const handleSubmitPress = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={open}
      statusBarTranslucent
      useNativeDriver={Platform.OS === 'ios' ? false : true}
      onBackdropPress={() => setOpen(false)}
      style={styles.view}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconButton icon="cancel-01" onPress={() => {}} />
        </View>
        <View style={styles.imgIcon}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={img} />
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.title}>Set your location</Text>
          <Text style={styles.subTitle}>
            Set your location so we can find and pick you from the right spots
            and find vehicles around you.
          </Text>
        </View>
        <View style={styles.btn}>
          <Button
            text="Set automatically"
            primary={true}
            onPress={handleSubmitPress}
          />
          <Button
            text="Set Later"
            primary={false}
            onPress={handleSubmitPress}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: -50,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 30,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  selectContainer: {
    paddingVertical: 20,
  },
  select: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectInfo: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 28,
    color: colors.brandPrimaryP950,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textAsh,
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.textDark,
  },
  info: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: colors.textAsh,
    lineHeight: 15,
    marginTop: 8,
  },
  imgIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    height: 90,
    width: 90,
    padding: 20,
    borderRadius: 45,
    backgroundColor: colors.bkgLightAsh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 45,
    resizeMode: 'contain',
  },
  btn: {
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SetLocation;
