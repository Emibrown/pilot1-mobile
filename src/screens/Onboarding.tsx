import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fonts} from '../res/fonts';
import CustomIcon from '../components/CustomIcon';
import {colors} from '../res/colors';

const slide1 = require('../assets/slide1.png');
const slide2 = require('../assets/slide2.png');
const slide3 = require('../assets/slide3.png');

const windowDimensions = Dimensions.get('window');

const slide = [
  {
    image: slide1,
    quote: 'Get a ride in\nseconds!',
    text: "Simply set your pickup location, choose your ride type, and you're good to go",
  },
  {
    image: slide2,
    quote: 'Discover popular\ndestinations!',
    text: 'Explore trending spots in your city and book rides with ease.',
  },
  {
    image: slide3,
    quote: 'Stay safe and\ninformed',
    text: 'Access safety tips, trip details, and driver information for peace of mind',
  },
];

const Onboarding = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  const scrollEl = useRef<ScrollView>(null);

  const [sliderState, setSliderState] = useState({currentPage: 0});

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / windowDimensions.width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

  return (
    <ScrollView
      contentContainerStyle={styles.containerStyle}
      bounces={false}
      style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <View style={styles.slideContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>
        <ScrollView
          ref={scrollEl}
          contentContainerStyle={styles.slider}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          {slide.map((item, i) => (
            <View style={styles.des} key={i}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.image} />
              </View>
              <View style={styles.info}>
                <Text style={styles.quote}>{item.quote}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.paginationWrapper}>
            {Array.from(Array(3).keys()).map((key, index) => (
              <View
                style={[
                  styles.paginationDots,
                  pageIndex === index
                    ? styles.paginationDotsActive
                    : styles.paginationDotsInactive,
                ]}
                key={index}
              />
            ))}
          </View>

          <View>
            {pageIndex !== 2 ? (
              <Pressable
                style={styles.nextButton}
                onPress={() => {
                  scrollEl.current?.scrollTo({
                    x: windowDimensions.width * (pageIndex + 1),
                    y: 0,
                    animated: true,
                  });
                }}>
                <CustomIcon
                  name="arrow-right-02-round"
                  size={30}
                  color={colors.brandPrimaryP800}
                />
              </Pressable>
            ) : (
              <Pressable
                style={styles.getStartedButton}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.getStartedText}>Get started</Text>
                <CustomIcon
                  name="arrow-right-02-round"
                  size={20}
                  color={'white'}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  font1: {
    fontFamily: fonts.ExtraBold,
  },
  font2: {
    fontFamily: fonts.Medium,
  },
  slideContainer: {
    flex: 1,
  },
  des: {
    flex: 1,
    width: windowDimensions.width,
  },
  info: {
    paddingLeft: 20,
  },
  quote: {
    fontSize: 28,
    color: colors.brandPrimaryP950,
    fontFamily: fonts.Bold,
    lineHeight: 34,
  },
  text: {
    fontSize: 14,
    color: colors.textDarkAsh,
    fontFamily: fonts.Regular,
    lineHeight: 20,
    width: '80%',
  },
  slider: {
    // backgroundColor: 'yellow',
  },
  imageContainer: {
    height: (60 * windowDimensions.height) / 100,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: (50 * windowDimensions.height) / 100,
    width: windowDimensions.width,
  },
  paginationWrapper: {
    flexDirection: 'row',
  },
  paginationDots: {
    height: 6,
    borderRadius: 6 / 2,
    marginLeft: 5,
  },
  paginationDotsActive: {
    width: 60,
    backgroundColor: colors.brandPrimaryBase,
  },
  paginationDotsInactive: {
    width: 35,
    backgroundColor: colors.neutralN100,
  },
  skipText: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.textDarkAsh,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: '8%',
    paddingHorizontal: 15,
  },
  nextButton: {
    height: 48,
    width: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: colors.brandPrimaryBase,
  },
  getStartedButton: {
    height: 48,
    backgroundColor: colors.brandPrimaryBase,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 14,
    gap: 10,
  },
  getStartedText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: 'white',
  },
});

export default Onboarding;
