// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
import { EventsService } from '../services/events.service';
import { BookingsService } from '../services/bookings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {
  eventos: Events[] = [];
  mensajeReserva: string = '';
  errorMensaje: string = '';

  constructor(
    private eventService: EventsService,
    private bookingService: BookingsService
  ) {}

  ngOnInit() {
    this.getEventos();
  }

  private getEventos() {
    this.eventService.allEvents().subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
        this.errorMensaje = 'Error al cargar los eventos';
      }
    });
  }

  reservar(evento: Events) {
    if (evento.asistentestot >= evento.asistentesmax) {
      this.errorMensaje = 'El evento está completo';
      return;
    }

    this.bookingService.createBooking(evento.idevent).subscribe({
      next: (response) => {
        this.mensajeReserva = `¡Reserva realizada con éxito para el evento "${evento.nombre}"!`;
        this.getEventos(); // Actualizar la lista de eventos
        setTimeout(() => this.mensajeReserva = '', 3000);
      },
      error: (error) => {
        console.error('Error al realizar la reserva:', error);
        this.errorMensaje = error.error || 'Error al realizar la reserva';
        setTimeout(() => this.errorMensaje = '', 3000);
      }
    });
  }
}