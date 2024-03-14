/****************************
Copyright © 2021-present Boeing. All rights reserved.
****************************/

import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ReducerHelpers } from './helpers/reducer-helpers';
import { DataStorageEntityState, initialExtState } from 'src/app/core/models/state-ext';
import { ReservationDto } from 'src/app/core/models/reservations-resources.model';
import { ReservationActions } from '../actions/reservations.actions';


export type ReservationStorageState = DataStorageEntityState<ReservationDto>;
export const reservationEntityAdapter = createEntityAdapter<ReservationDto>();
export const reservationInitialState: ReservationStorageState =
    reservationEntityAdapter.getInitialState(
        initialExtState
    );

const reducer = createReducer<ReservationStorageState>(
    reservationInitialState,
    on(
        ReservationActions.createReservation,
        ReducerHelpers.reduceLoadOperation
    ),
    on(ReservationActions.createReservationSuccess, (state, { reservation }) => reservationEntityAdapter.upsertOne(
        reservation,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(ReservationActions.createReservationFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),    
    on(
        ReservationActions.loadReservation,
        ReducerHelpers.reduceLoadOperation
    ),
    on(ReservationActions.loadReservationSuccess, (state, { reservation }) => reservationEntityAdapter.upsertOne(
        reservation,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(ReservationActions.loadReservationFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(
        ReservationActions.deleteReservation,
        ReducerHelpers.reduceLoadOperation
    ),
    on(ReservationActions.deleteReservationSuccess, (state, { id }) => reservationEntityAdapter.removeOne(
        id,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(ReservationActions.deleteReservationFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(
        ReservationActions.loadReservations,
        ReducerHelpers.reduceLoadOperation
    ),
    on(ReservationActions.loadReservationsSuccess, (state, { reservations }) => reservationEntityAdapter.setAll(
        reservations,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(ReservationActions.loadReservationsFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    )
);

export function reservationReducer(
    state: ReservationStorageState = reservationInitialState,
    action: Action
): ReservationStorageState {
    return reducer(state, action);
}
