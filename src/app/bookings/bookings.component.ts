// src/app/my-bookings/my-bookings.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../services/bookings.service';
import { EventsService } from '../services/events.service';
import { Bookings } from '../models/bookings';
import { Events } from '../models/events';

interface BookingWithEvent extends Bookings {
  eventName?: string;
  eventDate?: Date;
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.sass'
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingWithEvent[] = [];
  errorMensaje: string = '';

  constructor(
    private bookingsService: BookingsService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingsService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        // Cargar información de eventos para cada reserva
        this.bookings.forEach(booking => {
          this.eventsService.getEvent(booking.eventorsv).subscribe({
            next: (event) => {
              booking.eventName = event.nombre;
              booking.eventDate = event.fechaevento;
            }
          });
        });
      },
      error: (error) => {
        console.error('Error al cargar reservas:', error);
        this.errorMensaje = 'Error al cargar las reservas';
      }
    });
  }

  cancelarReserva(booking: Bookings) {
    this.bookingsService.deleteBooking(booking.idbooking!).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
        this.errorMensaje = 'Error al cancelar la reserva';
      }
    });
  }
}