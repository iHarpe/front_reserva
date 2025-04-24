import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from './services/session.service';
import { Subscription } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [RouterOutlet, CommonModule]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private sessionSubscription: Subscription;

  constructor(private sessionService: SessionService, private router: Router) {
    // Inicializa el estado al cargar
    this.isLoggedIn = this.sessionService.isLoggedIn();
    
    // Suscríbete a los cambios de sesión
    this.sessionSubscription = this.sessionService.sessionAct$.subscribe(
      (isActive: boolean) => {
        this.isLoggedIn = isActive;
      }
    );
  }

  ngOnInit() {
    // Si hay token al iniciar, emite el estado
    if (this.sessionService.isLoggedIn()) {
      this.sessionService.sessionAct$.emit(true);
    }
  }

  ngOnDestroy() {
    // Limpia la suscripción al destruir el componente
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToReservations() {
    this.router.navigate(['/mis-reservas']);
  }

  logout() {
    this.sessionService.logout();
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

}