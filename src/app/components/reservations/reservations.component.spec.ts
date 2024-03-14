import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsComponent } from './reservations.component';
import { of } from 'rxjs';
import { ReservationDto, ReservationFilter } from 'src/app/core/models/reservations-resources.model';
import { ReservationsDataService } from 'src/app/core/services/reservations.service';
import { AuthService } from 'src/app/core/services/auth.service';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;
  let reservationDataService: ReservationsDataService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsComponent],
      providers: [
        { provide: ReservationsDataService, useValue: { reservations$: of(mockReservationsData), isLoading$: of(false), loadReservations: jasmine.createSpy('loadReservations'), deleteReservation: jasmine.createSpy('deleteReservation') } },
        { provide: AuthService, useValue: { isAdmin: jasmine.createSpy('isAdmin').and.returnValue(false), getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ username: 'testUser' }) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    reservationDataService = TestBed.inject(ReservationsDataService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load reservations for admin users', () => {
    authService.isAdmin = jasmine.createSpy('isAdmin').and.returnValue(true)
    component.ngOnInit();
    expect(reservationDataService.loadReservations).toHaveBeenCalledWith(null);
  });

  it('should load reservations for non-admin users', () => {
    component.ngOnInit();
    expect(reservationDataService.loadReservations).toHaveBeenCalledWith({ createdBy: 'testUser' } as ReservationFilter);
  });

  it('should set reservations and loading status on initialization', () => {
    expect(component.reservations).toEqual(mockReservationsData);
    expect(component.isLoading$).toBeDefined();
  });

  it('should set selectedId and open confirmation dialog on cancel reservation click', () => {
    const id = 1;
    component.onCancelReservationClicked(id);
    expect(component.selectedId).toEqual(id);
    expect(component.opened).toBeTrue();
  });

  it('should delete reservation and close confirmation dialog on confirmation', () => {
    const id = 1;
    component.selectedId = id;
    component.confirm();
    expect(reservationDataService.deleteReservation).toHaveBeenCalledWith(id);
    expect(component.opened).toBeFalse();
    expect(component.selectedId).toEqual(0);
  });

  it('should close confirmation dialog on cancel', () => {
    component.close();
    expect(component.opened).toBeFalse();
    expect(component.selectedId).toEqual(0);
  });
});

const mockReservationsData = [
] as ReservationDto[];
