import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookings } from '../models/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createBooking(eventId: number): Observable<Bookings> {
    const booking: Bookings = {
      fechareserva: new Date(),
      eventorsv: eventId
    };
    return this.http.post<Bookings>(`${this.API_URL}/createBooking`, booking);
  }

  getAllBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(`${this.API_URL}/getAllBookings`);
  }

  getBooking(id: number): Observable<Bookings> {
    return this.http.get<Bookings>(`${this.API_URL}/getBooking?id=${id}`);
  }

  deleteBooking(id: number): Observable<Bookings> {
    return this.http.delete<Bookings>(`${this.API_URL}/deleteBooking?id=${id}`);
  }
}