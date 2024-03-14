import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ReservationDto, ReservationFilter } from 'src/app/core/models/reservations-resources.model';
import { Observable, takeUntil } from 'rxjs';
import { MultipleSortSettings } from '@progress/kendo-angular-grid';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReservationsDataService } from 'src/app/core/services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent extends BaseComponent implements OnInit {
  reservations: ReservationDto[];
  isLoading$: Observable<boolean>;
  selectedId = 0;
  sortSettings: MultipleSortSettings = {
    mode: 'multiple',
    multiSortKey: 'none',
  };

  constructor(
    private readonly reservationDataService: ReservationsDataService,
    private readonly authService: AuthService) {
    super();
  }
  // Do not show the Dialog initially.
  public opened = false;

  ngOnInit(): void {
    if (this.authService.isAdmin())
      this.reservationDataService.loadReservations(null);
    else
      this.reservationDataService.loadReservations({ createdBy: this.authService.getCurrentUser().username } as ReservationFilter);
    this.reservationDataService.reservations$.pipe(takeUntil(this.destroyed$)).subscribe(reservations => this.reservations = reservations);
    this.isLoading$ = this.reservationDataService.isLoading$;

  }

  onCancelReservationClicked(id: number) {
    this.selectedId = id;
    this.open();
  }

  confirm() {
    this.reservationDataService.deleteReservation(this.selectedId);
    this.close();
  }

  close(): void {
    this.opened = false;
    this.selectedId = 0;
  }

  open(): void {
    this.opened = true;
  }
}
