import {UPDATE_USER, LOGOUT} from '../ActionTypes';
import {IUser, StateActions} from '../interfaces';

const user: IUser = {
  isLogin: false,
  firstName: '',
  lastName: '',
};

const userReducer = (initialUser: IUser = user, action: StateActions) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_USER:
      return {...initialUser, ...payload};
    case LOGOUT:
      return {phone_number: initialUser.phone_number};
    default:
      return initialUser;
  }
};

export default userReducer;
