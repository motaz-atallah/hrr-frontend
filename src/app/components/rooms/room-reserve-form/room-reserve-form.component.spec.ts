import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RoomReserveFormComponent } from './room-reserve-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoomDto } from 'src/app/core/models/rooms-resources.model';
import { CreateReservationDto } from 'src/app/core/models/reservations-resources.model';
import { User } from 'src/app/core/models/users.model';

describe('RoomReserveFormComponent', () => {
  let component: RoomReserveFormComponent;
  let fixture: ComponentFixture<RoomReserveFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let datePipe: DatePipe;

  beforeEach(waitForAsync(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    TestBed.configureTestingModule({
      declarations: [RoomReserveFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        DatePipe
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    datePipe = TestBed.inject(DatePipe);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReserveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit reservation when form is submitted', () => {
    const reservation: CreateReservationDto = {
      guestName: 'John Doe',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-17'),
      roomId: 123,
      createdBy: 'testuser',
      totalPrice: 300
    };
    const form = { valid: true, form: { markAllAsTouched: jasmine.createSpy() } } as unknown as NgForm;
    const emitSpy = spyOn(component.submit, 'emit');

    authServiceSpy.getCurrentUser.and.returnValue({ username: 'testuser' } as User);
    spyOn(datePipe, 'transform').and.callThrough();

    component.room = { id: 123, price: 100 } as RoomDto;
    component.reservation = reservation;

    component.onSubmit(form);

    expect(datePipe.transform).toHaveBeenCalledTimes(2);
    expect(datePipe.transform).toHaveBeenCalledWith(reservation.startDate, 'yyyy-MM-dd');
    expect(datePipe.transform).toHaveBeenCalledWith(reservation.endDate, 'yyyy-MM-dd');

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(reservation);
  });

  it('should mark all form controls as touched when form is invalid', () => {
    const form = { valid: false, form: { markAllAsTouched: jasmine.createSpy() } } as unknown as NgForm;
    spyOn(component.submit, 'emit');

    component.onSubmit(form);

    expect(form.form.markAllAsTouched).toHaveBeenCalledTimes(1);
  });

  it('should calculate days difference between dates correctly', () => {
    const startDate = new Date('2024-03-15');
    const endDate = new Date('2024-03-17');
    expect(component.getDaysCountBetweenDates(startDate, endDate)).toBe(3);
  });
});
