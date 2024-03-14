import { HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

export class BaseHttpService {
    constructor(private datePipe: DatePipe) { }
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }

    buildHttpParams(filter: any): HttpParams {
        let params = new HttpParams();

        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (filter[key] !== null && filter[key] !== undefined) {
                    if (this.isDate(filter[key])) {
                        const formattedDate = this.datePipe.transform(filter[key], 'yyyy-MM-dd');
                        params = params.set(key, formattedDate);
                    } else {
                        params = params.set(key, filter[key]);
                    }
                }
            }
        }

        return params;
    }

    isDate(value: any): boolean {
        return value instanceof Date && !isNaN(value.valueOf());
    }
}