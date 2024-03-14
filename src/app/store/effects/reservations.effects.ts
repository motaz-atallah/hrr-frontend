/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ReservationActions } from '../actions/reservations.actions';
import { ReservationDto } from '../../core/models/reservations-resources.model';
import { ReservationsHttpService } from 'src/app/core/services/http/reservations.http-service';
@Injectable()
export class ReservationsEffects {

  readonly loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadReservations),
      mergeMap(({ filter }) =>
        this.httpService.getReservations(filter).pipe(
          map((payload: ReservationDto[]) => ReservationActions.loadReservationsSuccess({ reservations: payload })),
          catchError(errorMessage => of(ReservationActions.loadReservationsFailure({ error: errorMessage })))
        )
      )
    )
  );

  readonly createEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.createReservation),
      mergeMap(({ reservation }) =>
        this.httpService.createReservation(reservation).pipe(
          map((payload: ReservationDto) => ReservationActions.createReservationSuccess({ reservation: payload })),
          catchError(errorMessage => of(ReservationActions.createReservationFailure({ error: errorMessage })))
        )
      )
    )
  );

  
  readonly deleteEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.deleteReservation),
      mergeMap(({ id }) =>
        this.httpService.deleteReservation(id).pipe(
          map(() => ReservationActions.deleteReservationSuccess({ id })),
          catchError(errorMessage => of(ReservationActions.deleteReservationFailure({ error: errorMessage })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly httpService: ReservationsHttpService
  ) { }
}
