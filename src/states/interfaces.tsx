import {LOGOUT, UPDATE_RIDE, UPDATE_USER} from './ActionTypes';

export interface IUser {
  isLogin?: boolean;
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone_number?: string;
}

export interface IRide {
  pick_up?: ILocation;
  destination?: ILocation;
}

export interface ICoord {
  lng: number;
  lat: number;
}

export interface ILocation {
  street: string;
  city: string;
  placeId: string;
  coord: ICoord;
}

export interface IAppState {
  user: IUser;
  ride: IRide;
}

export interface IUpdateUser {
  type: typeof UPDATE_USER;
  payload: IUser;
}

export interface IUpdateRide {
  type: typeof UPDATE_RIDE;
  payload: IRide;
}

export interface ILogout {
  type: typeof LOGOUT;
  payload?: null;
}

export type UserActions = IUpdateUser | ILogout;
export type RideAction = IUpdateRide;
export type StateActions = UserActions | RideAction;
