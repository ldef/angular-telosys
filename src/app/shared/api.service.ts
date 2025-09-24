import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class ApiService {
    
  /**
   * Handle HTTP errors
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid data provided';
          break;
        case 401:
          errorMessage = 'Unauthorized: Authentication required';
          break;
        case 403:
          errorMessage = 'Forbidden: Access denied';
          break;
        case 404:
          errorMessage = 'Not Found: Driver not found';
          break;
        case 409:
          errorMessage = 'Conflict: Driver already exists';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }

    console.error('DriverService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
