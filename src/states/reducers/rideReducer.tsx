import {UPDATE_RIDE} from '../ActionTypes';
import {IRide, StateActions} from '../interfaces';

const ride: IRide = {};

const rideReducer = (initialUser: IRide = ride, action: StateActions) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_RIDE:
      return {...initialUser, ...payload};
    default:
      return initialUser;
  }
};

export default rideReducer;
