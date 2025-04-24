import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  allEvents(): Observable<Events[]> {
    return this.httpClient.get<Events[]>(`${this.API_URL}/getAllEvents`);
  }

  getEvent(id: number): Observable<Events> {
    return this.httpClient.get<Events>(`${this.API_URL}/getEvent?id=${id}`);
  }

  createEvent(event: Events): Observable<Events> {
    return this.httpClient.post<Events>(`${this.API_URL}/createEvent`, event);
  }

  updateEvent(event: Events): Observable<Events> {
    return this.httpClient.patch<Events>(`${this.API_URL}/updateEvents`, event);
  }

  deleteEvent(id: number): Observable<Events> {
    return this.httpClient.delete<Events>(`${this.API_URL}/deleteEvents?id=${id}`);
  }
}