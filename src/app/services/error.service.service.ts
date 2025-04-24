import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(error: HttpErrorResponse): void {
    if (error.status === 401 || error.status === 403) {
      console.error('Error de autenticación');
    } else if (error.status === 404) {
      console.error('Recurso no encontrado');
    } else {
      console.error('Error del servidor');
    }
  }
}