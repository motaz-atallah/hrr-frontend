import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set gradientBackground to true for home route', () => {
    const navigationStart = new NavigationStart(1, '/home');
    spyOn(router.events, 'pipe').and.returnValue(of(navigationStart));
    
    component.ngOnInit();

    expect(component.gradientBackground).toBeTrue();
  });

  it('should set gradientBackground to true for root route', () => {
    const navigationStart = new NavigationStart(1, '/');
    spyOn(router.events, 'pipe').and.returnValue(of(navigationStart));
    
    component.ngOnInit();

    expect(component.gradientBackground).toBeTrue();
  });

  it('should set gradientBackground to false for rooms routes', () => {
    const navigationStart = new NavigationStart(1, '/rooms');
    spyOn(router.events, 'pipe').and.returnValue(of(navigationStart));
    
    component.ngOnInit();

    expect(component.gradientBackground).toBeFalse();
  });

  it('should check if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    expect(component.isAuthenticated).toBeTrue();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
});
