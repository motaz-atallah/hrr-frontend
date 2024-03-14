/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RoomsActions } from '../actions/rooms.actions';
import { RoomDto } from '../../core/models/rooms-resources.model';
import { RoomsHttpService } from 'src/app/core/services/http/rooms.http-service';
@Injectable()
export class RoomsEffects {

  readonly loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomsActions.loadRooms),
      mergeMap(({ filter }) =>
        this.httpService.getRooms(filter).pipe(
          map((payload: RoomDto[]) => RoomsActions.loadRoomsSuccess({ rooms: payload })),
          catchError(errorMessage => of(RoomsActions.loadRoomsFailure({ error: errorMessage })))
        )
      )
    )
  );

  readonly loadEntity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RoomsActions.loadRoom),
    mergeMap(({ roomId }) =>
      this.httpService.getRoom(roomId).pipe(
        map((payload: RoomDto) => RoomsActions.loadRoomSuccess({ room: payload })),
        catchError(errorMessage => of(RoomsActions.loadRoomFailure({ error: errorMessage })))
      )
    )
  )
);

  constructor(
    private readonly actions$: Actions,
    private readonly httpService: RoomsHttpService
  ) { }
}
