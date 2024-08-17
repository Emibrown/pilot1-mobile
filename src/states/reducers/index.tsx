import {combineReducers} from 'redux';
import userReducer from './userReducer';
import rideReducer from './rideReducer';

export default combineReducers({
  user: userReducer,
  ride: rideReducer,
});
