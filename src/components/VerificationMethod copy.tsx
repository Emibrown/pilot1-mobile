import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Button from './Button';
import CustomIcon from './CustomIcon';
import {fonts} from '../res/fonts';
import {colors} from '../res/colors';

export type IVerificationMethod = {
  close: () => void;
  present: () => void;
};

type Props = {
  onSubmit: () => void;
};

const methods = [
  {
    icon: 'smart-phone-01',
    text: 'Text Message(SMS)',
    info: 'We’ll send a verification code your number',
  },
  {
    icon: 'WhatsApp-svg',
    text: 'WhatsApp',
    info: 'We’ll send a verification code your whatsapp number',
  },
];

const VerificationMethod = forwardRef<IVerificationMethod, Props>(
  ({onSubmit}, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      close() {
        bottomSheetModalRef.current?.close();
      },
      present() {
        bottomSheetModalRef.current?.present();
      },
    }));

    const handleSubmitPress = () => {
      onSubmit();
    };

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    // renders
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.3}
          pressBehavior={'close'}
        />
      ),
      [],
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['50%']}
          enableOverDrag={false}
          enableDynamicSizing
          backdropComponent={renderBackdrop}>
          <BottomSheetView style={styles.contentContainer}>
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
                      <Text style={styles.info}>
                        {item.info}, +2349187654321
                      </Text>
                    </View>
                    <View>
                      {/* radio_button_checked_FILL0_wght300_GRAD0_opsz24-1 */}
                      <CustomIcon
                        name="circle"
                        size={18}
                        color={colors.neutralN600}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
              <View style={{paddingBottom: 20, paddingHorizontal: 20}}>
                <Button text="Send Code" primary={true} onPress={() => {}} />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    flex: 1,
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
