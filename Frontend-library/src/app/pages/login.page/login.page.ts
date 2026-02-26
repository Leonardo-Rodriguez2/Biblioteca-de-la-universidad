import { Component, inject } from '@angular/core';
import { AuthLoginService } from '../../services/auth.login/auth.login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login.page',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private auth = inject(AuthLoginService);
  private router = inject(Router);

  public body = {
    username: "",
    password: ""
  };

  login() {
    this.auth.authLogin(this.body).subscribe({
      next: (data: any) => {
        console.log('Login exitoso', data);
        this.router.navigate(['/dashboard/home']);
        localStorage.setItem('token', data.token);
      },
      error: (err: any) => {
        console.error('Error en login', err);
      }
    });
  }
}