import { Injectable } from '@angular/core';
import { User, users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionTimeout: number = 15 * 60 * 1000;

  constructor() {
    this.checkSessionTimeout();
  }

  login(username: string, password: string): boolean {
    const user = users.find(u => u.username.toLocaleLowerCase() === username.toLocaleLowerCase() && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('loginTime', Date.now().toString());
      this.resetSessionTimeout(); 
      return true;
    } else {
      return false;
    }
  }

  resetSessionTimeout(): void {
    localStorage.setItem('loginTime', Date.now().toString());
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  checkSessionTimeout(): void {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTime, 10);
      if (elapsedTime >= this.sessionTimeout) {
        this.logout();
      } else {
        const remainingTime = this.sessionTimeout - elapsedTime;
        setTimeout(() => {
          this.logout();
        }, remainingTime);
      }
    }
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user? user.isAdmin : false;
  }
}
