import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  username: string = null;
  password: string = null;

  errorMessage: string
  constructor(private readonly authservice: AuthService) { }

  login() {
    this.errorMessage = this.authservice.login(this.username, this.password) ? null : "Invalid username or password.";
  }
}
