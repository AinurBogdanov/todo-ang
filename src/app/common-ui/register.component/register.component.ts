import { Component, OnInit } from '@angular/core';

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
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  isLoginMode = true;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  
  onSubmit () {
    const { username, password } = this.registerForm.value;

    if(this.isLoginMode) {
      this.authService.logIn(username, password)
       .subscribe({
         next: (response) => {
           console.log('вход успешен!', response);
           // перенаправить на страницу todo
         },
         error: (err)=> {
           console.error('ошибка:', err)
         }
        })
    } else {
      this.authService.register(username, password)
        .subscribe({
          next: (response) => {
            console.log('Регестрация и авторизация успешны!', response);
            // перенаправить на страницу todo
          },
          error: (err)=> {
            console.error('ошибка:', err)
          }
        })
    }
  }
}

// Ainur
// 18082006

// id "1751257581902"
// token "
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFpbnVyIiwic3ViIjoiMTc1MTI1NzU4MTkwMiIsImlhdCI6MTc1MTI1NzcyMiwiZXhwIjoxNzUxMjYxMzIyfQ.TFgiWE5iKB6GLWxnkf0iiDmsCljlkIvZuIJ91oC1x3U
// "