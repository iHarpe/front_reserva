import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './bookings/bookings.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signin', component: RegisterComponent },
  { path: 'mis-reservas', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];