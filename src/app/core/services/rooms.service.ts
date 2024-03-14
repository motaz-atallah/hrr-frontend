/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoomsStorageSelectors } from 'src/app/store/selectors/rooms.selector';
import { RoomsActions } from 'src/app/store/actions/rooms.actions';
import { RoomDto, RoomFilter } from '../models/rooms-resources.model';
import { SortType } from '../enums/sort-type.enum';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class RoomsDataService {
    constructor(
        private readonly store$: Store
    ) { }

    get rooms$(): Observable<RoomDto[]> {
        return this.store$.select(RoomsStorageSelectors.entities);
    }

    get isLoading$(): Observable<boolean> {
        return this.store$.select(RoomsStorageSelectors.loading);
    }

    get filter$(): Observable<RoomFilter> {
        return this.store$.select(RoomsStorageSelectors.filters);
    }

    get sortBy$(): Observable<{
        column: string;
        sortType: SortType;
    }> {
        return this.store$.select(RoomsStorageSelectors.sortBy);
    }

    roomById(id: number): Observable<RoomDto> {
        return this.store$.select(RoomsStorageSelectors.oneById(id));
    }
    loadRooms(filter: RoomFilter): void {
        this.store$.dispatch(RoomsActions.loadRooms({ filter }));
    }
    loadRoomById(id: number): void {
        this.store$.dispatch(RoomsActions.loadRoom({ roomId: id }));
    }
    reset(): void {
        this.store$.dispatch(RoomsActions.reset());
    }
    updateFilters(filter: RoomFilter): void {
        this.store$.dispatch(RoomsActions.updateFilters({ filter }));
    }
    updateSortBy(column: string, sortType: SortType): void {
        this.store$.dispatch(RoomsActions.updateSortBy({ column, sortType }));
    }
}
