/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReservationsStorageSelectors } from 'src/app/store/selectors/reservations.selector';
import { ReservationActions } from 'src/app/store/actions/reservations.actions';
import { CreateReservationDto, ReservationDto, ReservationFilter } from '../models/reservations-resources.model';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class ReservationsDataService {
    constructor(
        private readonly store$: Store
    ) { }

    get reservations$(): Observable<ReservationDto[]> {
        return this.store$.select(ReservationsStorageSelectors.entities);
    }

    get isLoading$(): Observable<boolean> {
        return this.store$.select(ReservationsStorageSelectors.loading);
    }

    createReservation(reservation: CreateReservationDto): void {
        this.store$.dispatch(ReservationActions.createReservation({ reservation }));
    }

    loadReservations(filter: ReservationFilter): void {
        this.store$.dispatch(ReservationActions.loadReservations({ filter }));
    }

    deleteReservation(id: number): void {
        this.store$.dispatch(ReservationActions.deleteReservation({ id }));
    }
}
