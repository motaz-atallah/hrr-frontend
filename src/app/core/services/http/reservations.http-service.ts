import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateReservationDto, ReservationDto, ReservationFilter, UpdateReservationDto } from 'src/app/core/models/reservations-resources.model';
import { DatePipe } from '@angular/common';
import { BaseHttpService } from './base.http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationsHttpService extends BaseHttpService {
  constructor(private http: HttpClient, datePipe: DatePipe) {
    super(datePipe);
  }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getReservations(filter: ReservationFilter): Observable<ReservationDto[]> {
    let params = this.buildHttpParams(filter);
    return this.http
      .get<ReservationDto[]>(environment.apiBaseUrl + '/reservations', { params })
      .pipe(catchError(this.handleError));
  }
  getReservation(id: number): Observable<ReservationDto> {
    return this.http
      .get<ReservationDto>(environment.apiBaseUrl + '/reservations/' + id)
      .pipe(catchError(this.handleError));
  }
  createReservation(room: CreateReservationDto): Observable<ReservationDto> {
    return this.http
      .post<ReservationDto>(
        environment.apiBaseUrl + '/reservations',
        JSON.stringify(room),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateReservation(id: number, room: UpdateReservationDto): Observable<ReservationDto> {
    return this.http
      .put<ReservationDto>(
        environment.apiBaseUrl + '/reservations/' + id,
        JSON.stringify(room),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  deleteReservation(id: number) {
    return this.http
      .delete(environment.apiBaseUrl + '/reservations/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}