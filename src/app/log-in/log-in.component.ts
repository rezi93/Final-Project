import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataserviceService } from '../service/dataservice.service';
import { LoginCredentials, LoginResponse, LoginData } from '../interfaces/logininterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  users: LoginData[] = [];

  constructor(
    private fb: FormBuilder,
    private _service: DataserviceService,
    private router: Router
  ) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._service.getAllUsers().subscribe({
      next: (data: LoginData[]) => {
        this.users = data;
        localStorage.setItem('users', JSON.stringify(data));
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        console.error(error);
      }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in valid credentials';
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: LoginData) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      alert('Authorization successfully completed!');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
    this.loading = false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('users');
    this.router.navigate(['/']);
  }
}
