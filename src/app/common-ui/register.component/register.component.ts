import { Component, inject, OnInit } from '@angular/core';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    // Material Modules
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  isLoginMode = true;
  hidePassword = true;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const { username, password } = this.registerForm.value;

    if (this.isLoginMode) {
      this.authService.logIn(username, password).subscribe({
        next: (response) => {
          console.log('вход успешен!', response);
        },
        error: (err) => {
          console.error('ошибка:', err);
        },
      });
    } else {
      this.authService.register(username, password).subscribe({
        next: (response) => {
          console.log('Регестрация и авторизация успешны!', response);
        },
        error: (err) => {
          console.error('ошибка:', err);
        },
      });
    }
  }
}
