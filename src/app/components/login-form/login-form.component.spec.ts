import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ FormsModule ],
      providers: [ AuthService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService login method with username and password', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const loginSpy = spyOn(authService, 'login').and.returnValue(true);

    component.username = username;
    component.password = password;
    component.login();

    expect(loginSpy).toHaveBeenCalledWith(username, password);
  });

  it('should set errorMessage to null if login is successful', () => {
    spyOn(authService, 'login').and.returnValue(true);
    component.login();
    expect(component.errorMessage).toBeNull();
  });

  it('should set errorMessage if login fails', () => {
    spyOn(authService, 'login').and.returnValue(false);
    component.login();
    expect(component.errorMessage).toEqual("Invalid username or password.");
  });
});
