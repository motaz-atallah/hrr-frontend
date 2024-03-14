import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.gurd';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authServiceStub: Partial<AuthService>;
    let router: Router;

    beforeEach(() => {
        authServiceStub = {
            isAuthenticated: () => false // Mocking the isAuthenticated method to return false by default
        };

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                AuthGuard,
                { provide: AuthService, useValue: authServiceStub }
            ]
        });

        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true and allow navigation when authenticated', () => {
        authServiceStub.isAuthenticated = () => true;
        const canActivate = guard.canActivate();
        expect(canActivate).toBe(true);
    });

    it('should return false and redirect to /home when not authenticated', () => {
        authServiceStub.isAuthenticated = () => false; // Override the method to return false
        const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
        const canActivate = guard.canActivate();
        expect(canActivate).toBe(false);
        expect(navigateSpy).toHaveBeenCalled();
      });
});
