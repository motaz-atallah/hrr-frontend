import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { takeUntil } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  gradientBackground = false;

  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.gradientBackground = event.url.indexOf('home') != -1 || event.url == '/';
      }
    });
  }
}

