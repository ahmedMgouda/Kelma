import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  loginData = {
    userName: '',
    password: ''
  };
  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(this.loginData);
  }
}
