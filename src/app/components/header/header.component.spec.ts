import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ RouterTestingModule ],
      providers: [ AuthService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the given path on click', async () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const path = '/test';
    await component.onClick(path);
    expect(navigateByUrlSpy).toHaveBeenCalledWith(path);
  });

  it('should toggle menu state on menu click', () => {
    component.isMenuOpened = false;
    component.onMenuClick();
    expect(component.isMenuOpened).toBeTruthy();

    component.onMenuClick();
    expect(component.isMenuOpened).toBeFalsy();
  });

  it('should add correct class when gradientBackground is true', () => {
    component.gradientBackground = true;
    expect(component.headerClass).toContain('header-over');
  });

  it('should add correct class when gradientBackground is false', () => {
    component.gradientBackground = false;
    expect(component.headerClass).toContain('site-header-height');
  });

  it('should add nav-open class when menu is opened', () => {
    component.isMenuOpened = true;
    expect(component.headerClass).toContain('nav-open');
  });

  it('should return true if the given name is selectedText', () => {
    component['selectedText'] = 'test';
    expect(component.isSelectedItem('test')).toBeTruthy();
    expect(component.isSelectedItem('other')).toBeFalsy();
  });

  it('should call authService.logout() and navigate to /home on logout', async () => {
    const logoutSpy = spyOn(authService, 'logout');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    await component.logout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/home');
  });
});
