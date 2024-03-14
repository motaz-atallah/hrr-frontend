// Copyright © 2021-present Boeing. All rights reserved.

import { createAction, props } from '@ngrx/store';
import { CreateReservationDto, ReservationDto, ReservationFilter, UpdateReservationDto } from '../../core/models/reservations-resources.model';

export class ReservationActions {
    static readonly loadReservation = createAction('[Reservationss] LOAD FOR RESERVATION', props<{ reservationId: number }>());
    static readonly loadReservationSuccess = createAction('[Reservationss] LOAD FOR RESERVATION SUCCESS', props<{ reservation: ReservationDto }>());
    static readonly loadReservationFailure = createAction('[Reservationss] LOAD FOR RESERVATION FAILURE', props<{ error: string }>());

    static readonly loadReservations = createAction('[Reservationss] LOAD FOR RESERVATIONS', props<{ filter: ReservationFilter }>());
    static readonly loadReservationsSuccess = createAction('[Reservationss] LOAD FOR RESERVATIONS SUCCESS', props<{ reservations: ReservationDto[] }>());
    static readonly loadReservationsFailure = createAction('[Reservationss] LOAD FOR RESERVATIONS FAILURE', props<{ error: string }>());

    static readonly createReservation = createAction('[Reservationss] CREATE RESERVATION', props<{ reservation: CreateReservationDto }>());
    static readonly createReservationSuccess = createAction('[Reservationss] CREATE RESERVATION SUCCESS', props<{ reservation: ReservationDto }>());
    static readonly createReservationFailure = createAction('[Reservationss] CREATE RESERVATION FAILURE', props<{ error: string }>());

    static readonly updateReservation = createAction('[Reservationss] UPDATE RESERVATION', props<{ id: number, reservation: UpdateReservationDto }>());
    static readonly updateReservationSuccess = createAction('[Reservationss] UPDATE RESERVATION SUCCESS', props<{ reservation: ReservationDto }>());
    static readonly updateReservationFailure = createAction('[Reservationss] UPDATE RESERVATION FAILURE', props<{ error: string }>());

    static readonly deleteReservation = createAction('[Reservationss] DELETE RESERVATION', props<{ id: number }>());
    static readonly deleteReservationSuccess = createAction('[Reservationss] DELETE RESERVATION SUCCESS', props<{ id: number }>());
    static readonly deleteReservationFailure = createAction('[Reservationss] DELETE RESERVATION FAILURE', props<{ error: string }>());
}