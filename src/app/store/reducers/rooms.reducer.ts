/****************************
Copyright © 2021-present Boeing. All rights reserved.
****************************/

import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ReducerHelpers } from './helpers/reducer-helpers';
import { RoomsActions } from '../actions/rooms.actions';
import { DataStorageEntityState, initialExtState } from 'src/app/core/models/state-ext';
import { RoomDto } from 'src/app/core/models/rooms-resources.model';


export type RoomStorageState = DataStorageEntityState<RoomDto>;
export const roomEntityAdapter = createEntityAdapter<RoomDto>();
export const roomInitialState: RoomStorageState =
    roomEntityAdapter.getInitialState(
        initialExtState
    );

const reducer = createReducer<RoomStorageState>(
    roomInitialState,
    on(
        RoomsActions.createRoom,
        ReducerHelpers.reduceLoadOperation
    ),
    on(RoomsActions.createRoomSuccess, (state, { room }) => roomEntityAdapter.upsertOne(
        room,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(RoomsActions.createRoomFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(
        RoomsActions.loadRoom,
        ReducerHelpers.reduceLoadOperation
    ),
    on(RoomsActions.loadRoomSuccess, (state, { room }) => roomEntityAdapter.upsertOne(
        room,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(RoomsActions.loadRoomFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(
        RoomsActions.deleteRoom,
        ReducerHelpers.reduceLoadOperation
    ),
    on(RoomsActions.deleteRoomSuccess, (state, { id }) => roomEntityAdapter.removeOne(
        id,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(RoomsActions.deleteRoomFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(
        RoomsActions.loadRooms,
        ReducerHelpers.reduceLoadOperation
    ),
    on(RoomsActions.loadRoomsSuccess, (state, { rooms }) => roomEntityAdapter.setAll(
        rooms,
        ReducerHelpers.reduceOnSuccess(state)
    )),
    on(RoomsActions.loadRoomsFailure, (state, { error }) =>
        ReducerHelpers.reduceFailureAction(state, { errorMessage: error })
    ),
    on(RoomsActions.updateFilters, (state, { filter }) => ({
        ...state,
        filter
    })
    ),
    on(RoomsActions.updateSortBy, (state, { column, sortType }) => ({
        ...state,
        sortBy: { column, sortType }
    })
    ),
    on(RoomsActions.reset, () => ({
        ...roomInitialState
    })
    )
);

export function roomReducer(
    state: RoomStorageState = roomInitialState,
    action: Action
): RoomStorageState {
    return reducer(state, action);
}
