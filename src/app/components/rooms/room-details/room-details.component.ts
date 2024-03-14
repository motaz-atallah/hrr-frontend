import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { RoomDto } from 'src/app/core/models/rooms-resources.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs';
import { RoomType } from 'src/app/core/enums/room-type.enum';
import { CreateReservationDto, ReservationDto } from 'src/app/core/models/reservations-resources.model';
import { ReservationsDataService } from 'src/app/core/services/reservations.service';
import { RoomsDataService } from 'src/app/core/services/rooms.service';
import { ImageName } from 'src/app/core/services/utils';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent extends BaseComponent implements OnInit {
  room: RoomDto;
  id: number;
  disabledDates: Date[] = [];


  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomsDataService: RoomsDataService,
    private readonly reservationDataService: ReservationsDataService,
    private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroyed$),
      filter(params => params && params['roomId']),
      switchMap(params => {
        this.id = params['roomId'];
        return this.roomsDataService.roomById(this.id);
      }),
      filter(existingData => !existingData)
    ).subscribe(() => {
      this.roomsDataService.loadRoomById(this.id);
    });

    this.roomsDataService.roomById(this.id).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(existingData => {
      if (existingData) {
        this.disabledDates = this.gerReservationDates(existingData.reservations);
        this.room = existingData;
      }
    });
  }

  async onSubmit(reservation: CreateReservationDto) {
    this.reservationDataService.createReservation(reservation);
    await this.router.navigateByUrl(`/reservations`);
  }

  gerReservationDates(reservations: ReservationDto[]): Date[] {
    if (reservations && reservations.length > 0) {
      const reservedDates: Date[] = [];
      reservations.forEach(reservation => {
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);

        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          reservedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      return reservedDates;
    }
    return null;
  }

  imageName(type: RoomType): string {
    return ImageName(type);
  }
}
