/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { ActionReducerMap } from '@ngrx/store';
import { RoomStorageState, roomReducer } from './rooms.reducer';
import { ReservationStorageState, reservationReducer } from './reservations.reducer';

export const FEATURE_PREFIX = 'ManagementStorage';

export interface ManagementState {
  roomStorage: RoomStorageState;
  reservationStorage: ReservationStorageState;
}

export const reducers: ActionReducerMap<ManagementState> = {
  roomStorage: roomReducer,
  reservationStorage: reservationReducer
};

export * from './rooms.reducer';
export * from './reservations.reducer';