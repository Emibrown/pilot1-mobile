import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import FloatingButton from './FloatingButton';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomIcon from './CustomIcon';
import {colors} from '../res/colors';
import {fonts} from '../res/fonts';

export default function TopBar({onEdit}: {onEdit: () => void}) {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top: top + 10}]}>
      <FloatingButton onPress={() => navigation.goBack()} />
      <View style={styles.searchContainer}>
        <Pressable
          android_ripple={{
            color: colors.neutralN100,
            // borderless: true,
          }}
          style={({pressed}) => [
            styles.search,
            pressed && Platform.OS === 'ios'
              ? {backgroundColor: colors.neutralN100}
              : {},
          ]}
          onPress={onEdit}>
          <CustomIcon name="search" size={18} color={colors.neutralN300} />
          <Text style={styles.searchText}>Wingside, 24 Perekule street.</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  search: {
    backgroundColor: 'white',

    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  searchText: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: fonts.Regular,
  },
});
