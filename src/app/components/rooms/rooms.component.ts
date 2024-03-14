import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Observable, combineLatest, takeUntil } from 'rxjs';
import { RoomDto, RoomFilter } from 'src/app/core/models/rooms-resources.model';
import { Router } from '@angular/router';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { RoomsDataService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent extends BaseComponent implements OnInit, OnDestroy {
  rooms: RoomDto[];
  filter: RoomFilter;
  sortBy: { column: string, sortType: SortType };

  isLoading$: Observable<boolean>;

  constructor(
    private readonly roomsDataService: RoomsDataService,
    private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    combineLatest([
      this.roomsDataService.rooms$,
      this.roomsDataService.sortBy$
    ]).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(([rooms, sortBy]) => {
      this.sortBy = sortBy;
      if (sortBy)
        this.rooms = this.sortRooms(rooms, sortBy.column, sortBy.sortType);
      else this.rooms = rooms;
    });

    this.isLoading$ = this.roomsDataService.isLoading$;
    this.roomsDataService.filter$.pipe(takeUntil(this.destroyed$)).subscribe(filter => this.filter = { ...filter });
  }

  sortRooms(rooms: RoomDto[], column: string, sortType: string): RoomDto[] {
    const sortedRooms = [...rooms];
    sortedRooms.sort((a, b) => {
      if (sortType === 'asc') {
        return a[column] - b[column];
      } else if (sortType === 'desc') {
        return b[column] - a[column];
      } else {
        return 0;
      }
    });
    return sortedRooms;
  }

  onSortChange(column: string, sortType: SortType) {
    this.roomsDataService.updateSortBy(column, sortType);
  }

  onSearchClick(filter: RoomFilter) {
    this.roomsDataService.updateFilters(filter);
    this.roomsDataService.loadRooms(filter);
  }

  async onClick(id: number) {
    await this.router.navigateByUrl(`/room/${id}`);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.roomsDataService.reset();
  }
}
