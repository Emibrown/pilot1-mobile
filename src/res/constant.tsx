import {Dimensions} from 'react-native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

export const LATITUDE_DELTA = 0.004;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
