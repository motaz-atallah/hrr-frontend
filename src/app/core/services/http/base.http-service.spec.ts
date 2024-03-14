import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { BaseHttpService } from './base.http-service';

describe('BaseHttpService', () => {
    let service: BaseHttpService;
    let datePipe: DatePipe;

    beforeEach(() => {
        datePipe = new DatePipe('en-US');
        service = new BaseHttpService(datePipe);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('handleError', () => {
        it('should return an observable with an error message', (done) => {
            const errorMessage = 'Test error message';
            const error = { error: new ErrorEvent('Error occurred', { message: errorMessage }), message: errorMessage };

            service.handleError(error).subscribe({
                next: () => {
                    fail('Error handler should not call next handler');
                },
                error: (receivedErrorMessage) => {
                    expect(receivedErrorMessage).toEqual(errorMessage);
                    done();
                }
            });
        });

        it('should return an observable with an error message constructed from status and message', (done) => {
            const status = 404;
            const message = 'Not Found';
            const error = { status: status, message: message };

            service.handleError(error).subscribe({
                next: () => {
                    fail('Error handler should not call next handler');
                },
                error: (receivedErrorMessage) => {
                    expect(receivedErrorMessage).toEqual(`Error Code: ${status}\nMessage: ${message}`);
                    done();
                }
            });
        });
    });

    describe('buildHttpParams', () => {
        it('should build HttpParams object from filter', () => {
            const filter = {
                key1: 'value1',
                key2: 123,
                key3: new Date('2022-03-20')
            };
            const params = service.buildHttpParams(filter);
            expect(params instanceof HttpParams).toBe(true);
            expect(params.get('key1')).toEqual('value1');
            expect(params.get('key2')).toEqual('123');
            expect(params.get('key3')).toEqual('2022-03-20');
        });

        it('should not add null or undefined values to HttpParams', () => {
            const filter = {
                key1: null,
                key2: undefined,
                key3: 'value3'
            };
            const params = service.buildHttpParams(filter);
            expect(params.has('key1')).toBe(false);
            expect(params.has('key2')).toBe(false);
            expect(params.get('key3')).toEqual('value3');
        });
    });

    describe('isDate', () => {
        it('should return true for valid date', () => {
            const result = service.isDate(new Date());
            expect(result).toBe(true);
        });

        it('should return false for invalid date', () => {
            const result = service.isDate('2022-03-20');
            expect(result).toBe(false);
        });
    });
});
