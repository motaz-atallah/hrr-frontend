import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateRoomDto, RoomDto, RoomFilter, UpdateRoomDto } from 'src/app/core/models/rooms-resources.model';
import { DatePipe } from '@angular/common';
import { BaseHttpService } from './base.http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsHttpService extends BaseHttpService {
  // Define API
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
  getRooms(filter: RoomFilter): Observable<RoomDto[]> {
    let params = this.buildHttpParams(filter);
    return this.http
      .get<any>(environment.apiBaseUrl + '/rooms', { params })
      .pipe(catchError(this.handleError));
  }
  getRoom(id: number): Observable<RoomDto> {
    return this.http
      .get<RoomDto>(environment.apiBaseUrl + '/rooms/' + id)
      .pipe(catchError(this.handleError));
  }
  createRoom(room: CreateRoomDto): Observable<RoomDto> {
    return this.http
      .post<RoomDto>(
        environment.apiBaseUrl + '/rooms',
        JSON.stringify(room),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateRoom(id: number, room: UpdateRoomDto): Observable<RoomDto> {
    return this.http
      .put<RoomDto>(
        environment.apiBaseUrl + '/rooms/' + id,
        JSON.stringify(room),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  deleteRoom(id: number) {
    return this.http
      .delete<RoomDto>(environment.apiBaseUrl + '/rooms/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}