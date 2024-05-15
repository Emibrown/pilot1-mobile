import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import CustomIcon from './CustomIcon';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';

export type IVerificationMethod = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: (v: number | null) => void;
};

const methods = [
  {
    id: 1,
    icon: 'smart-phone-01',
    text: 'Text Message(SMS)',
    info: 'We’ll send a verification code your number',
  },
  {
    id: 2,
    icon: 'WhatsApp-svg',
    text: 'WhatsApp',
    info: 'We’ll send a verification code your whatsapp number',
  },
];

const VerificationMethod = forwardRef<IVerificationMethod, Props>(
  ({onSubmit}, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<number | null>(null);

    useImperativeHandle(ref, () => ({
      close() {
        setOpen(false);
      },
      present() {
        setOpen(true);
      },
    }));

    const handleSubmitPress = useCallback(() => {
      onSubmit(selected);
    }, [onSubmit, selected]);

    return (
      <Modal
        backdropOpacity={0.3}
        isVisible={open}
        statusBarTranslucent
        useNativeDriver={Platform.OS === 'ios' ? false : true}
        onBackdropPress={() => setOpen(false)}
        style={styles.view}>
        <View style={styles.content}>
          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.title}>Choose verification method</Text>
            <Text style={styles.subTitle}>
              We’ll send a 4-digit code to your number to login.
            </Text>
          </View>
          <View style={styles.selectContainer}>
            {methods.map((item, i) => (
              <Pressable
                onPress={() => setSelected(item.id)}
                android_ripple={{
                  color: colors.neutralN100,
                }}
                style={styles.select}
                key={i}>
                <View>
                  <CustomIcon
                    name={item.icon}
                    size={24}
                    color={colors.neutralN600}
                  />
                </View>
                <View style={styles.selectInfo}>
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.info}>{item.info}, +2349187654321</Text>
                </View>
                <View>
                  {item.id === selected ? (
                    <CustomIcon
                      name="radio_button_checked_FILL0_wght300_GRAD0_opsz24-1"
                      size={18}
                      color={colors.brandPrimaryBase}
                    />
                  ) : (
                    <CustomIcon
                      name="circle"
                      size={18}
                      color={colors.neutralN600}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
          <View style={{paddingBottom: 20, paddingHorizontal: 20}}>
            <Button
              text="Send Code"
              disabled={!selected}
              primary={true}
              onPress={handleSubmitPress}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

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
    paddingTop: 50,
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
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.textDark,
  },
  subTitle: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: colors.textAsh,
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
});

export default VerificationMethod;
