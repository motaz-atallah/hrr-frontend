import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateReservationDto } from 'src/app/core/models/reservations-resources.model';
import { RoomDto } from 'src/app/core/models/rooms-resources.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-room-reserve-form',
  templateUrl: './room-reserve-form.component.html',
  styleUrls: ['./room-reserve-form.component.scss']
})
export class RoomReserveFormComponent {
  @Input() disabledDates: Date[] = [];
  @Input() room: RoomDto;

  @Output() public submit = new EventEmitter<CreateReservationDto>();

  reservation = {
    guestName: ''
  } as CreateReservationDto;
  
  minDate: Date = new Date();

  constructor(
    private readonly authService: AuthService,
    private readonly datePipe: DatePipe) {
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const reservation = { ...this.reservation } as CreateReservationDto;
      reservation.startDate = new Date(this.datePipe.transform(this.reservation.startDate, 'yyyy-MM-dd'));
      reservation.endDate = new Date(this.datePipe.transform(this.reservation.endDate, 'yyyy-MM-dd'));
      reservation.roomId = this.room.id;
      reservation.createdBy = this.authService.getCurrentUser().username;
      reservation.totalPrice = this.room.price * this.getDaysCountBetweenDates(reservation.startDate, reservation.endDate);
      this.submit.emit(reservation);
    } else {
      form.form.markAllAsTouched();
    }
  }

  getDaysCountBetweenDates(startDate: Date, endDate: Date): number {
    const startMs = startDate.getTime();
    const endMs = endDate.getTime();
    const differenceMs = endMs - startMs;
    const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return daysDifference + 1;
  }

}
