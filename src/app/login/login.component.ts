import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { UsersService } from '../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../models/users';

interface LoginResponse {
  token: string;
  user: Users;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {
  loguinForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    this.loguinForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return new FormGroup({
      userid: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login(): void {
    if (this.loguinForm.valid) {
      this.tryLogIn(
        this.loguinForm.get('userid')?.value,
        this.loguinForm.get('password')?.value
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
  }

  signIn(): void {
    this.router.navigate(['/signin']);
  }

  private tryLogIn(correo: string, pwd: string): void {
    this.userService.logInUser(correo, pwd).subscribe({
      next: (response: LoginResponse) => {
        if (response.token) {
          this.sessionService.setToken(response.token);
          this.sessionService.updateSession(correo);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'No se recibió token de autenticación';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Error en el inicio de sesión';
        console.error('Error:', error);
      }
    });
  }

  get userid() {
    return this.loguinForm.get('userid');
  }

  get password() {
    return this.loguinForm.get('password');
  }
}