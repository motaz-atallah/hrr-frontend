import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        localStorage.clear(); // Clear localStorage before each test
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should authenticate user with valid credentials', () => {
        const username = 'admin';
        const password = 'admin';
        expect(service.login(username, password)).toBe(true);
        expect(service.isAuthenticated()).toBe(true);
        expect(service.getCurrentUser()).toBeTruthy();
    });

    it('should not authenticate user with invalid credentials', () => {
        const username = 'invaliduser';
        const password = 'invalidpassword';
        expect(service.login(username, password)).toBe(false);
        expect(service.isAuthenticated()).toBe(false);
        expect(service.getCurrentUser()).toBe(null);
    });

    it('should logout user', () => {
        const username = 'admin';
        const password = 'admin';
        service.login(username, password);
        expect(service.isAuthenticated()).toBe(true);
        service.logout();
        expect(service.isAuthenticated()).toBe(false);
        expect(service.getCurrentUser()).toBe(null);
    });

    it('should return current user', () => {
        const username = 'Admin';
        const password = 'admin';
        service.login(username, password);
        const currentUser = service.getCurrentUser();
        expect(currentUser).toBeTruthy();
        expect(currentUser!.username).toBe(username);
    });

    it('should check if user is admin', () => {
        const username = 'admin';
        const password = 'admin';
        service.login(username, password);
        expect(service.isAdmin()).toBe(true);

        const nonAdminUsername = 'ahmad';
        const nonAdminPassword = '1234';
        service.login(nonAdminUsername, nonAdminPassword);
        expect(service.isAdmin()).toBe(false);
    });
});
