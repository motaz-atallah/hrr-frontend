// Copyright © 2021-present Boeing. All rights reserved.

import { createAction, props } from '@ngrx/store';
import { CreateRoomDto, RoomDto, RoomFilter, UpdateRoomDto } from '../../core/models/rooms-resources.model';
import { SortType } from '../../core/enums/sort-type.enum';


export class RoomsActions {
  static readonly loadRoom = createAction('[Rooms] LOAD FOR ROOM', props<{ roomId: number }>());
  static readonly loadRoomSuccess = createAction('[Rooms] LOAD FOR ROOM SUCCESS', props<{ room: RoomDto }>());
  static readonly loadRoomFailure = createAction('[Rooms] LOAD FOR ROOM FAILURE', props<{ error: string }>());

  static readonly loadRooms = createAction('[Rooms] LOAD FOR ROOMS', props<{ filter: RoomFilter }>());
  static readonly loadRoomsSuccess = createAction('[Rooms] LOAD FOR ROOMS SUCCESS', props<{ rooms: RoomDto[] }>());
  static readonly loadRoomsFailure = createAction('[Rooms] LOAD FOR ROOMS FAILURE', props<{ error: string }>());

  static readonly createRoom = createAction('[Rooms] CREATE ROOM', props<{ room: CreateRoomDto }>());
  static readonly createRoomSuccess = createAction('[Rooms] CREATE ROOM SUCCESS', props<{ room: RoomDto }>());
  static readonly createRoomFailure = createAction('[Rooms] CREATE ROOM FAILURE', props<{ error: string }>());

  static readonly updateRoom = createAction('[Rooms] UPDATE ROOM', props<{ id: number, room: UpdateRoomDto }>());
  static readonly updateRoomSuccess = createAction('[Rooms] UPDATE ROOM SUCCESS', props<{ room: RoomDto }>());
  static readonly updateRoomFailure = createAction('[Rooms] UPDATE ROOM FAILURE', props<{ error: string }>());

  static readonly deleteRoom = createAction('[Rooms] DELETE ROOM', props<{ id: number }>());
  static readonly deleteRoomSuccess = createAction('[Rooms] DELETE ROOM SUCCESS', props<{ id: number }>());
  static readonly deleteRoomFailure = createAction('[Rooms] DELETE ROOM FAILURE', props<{ error: string }>());

  static readonly updateFilters = createAction('[Rooms] UPDATE FILTERS', props<{ filter: RoomFilter }>());
  static readonly updateSortBy = createAction('[Rooms] UPDATE SORT BY', props<{ column: string, sortType: SortType }>());

  static readonly reset = createAction('[Rooms] RESET ROOM STATE');
}
