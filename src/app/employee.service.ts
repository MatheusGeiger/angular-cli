
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, merge, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, shareReplay } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrlEmployee = 'http://localhost:3001/api/employees/';
  private apiUrlUser = 'http://localhost:3001/api/users/';
  private _id = '5c31076471b3ba004f7811bd';
  private username = 'matheus';
  private password = '1234';
  private token = '';
  private stream$: Observable<any> = new Subject<void>().asObservable();
  public statusPostEmployee = new BehaviorSubject<Employee>(null);

  newPostEmployee = this.statusPostEmployee.asObservable();

  constructor(private http: HttpClient) { }

  public employeesResponseGet$: Observable<Employee[]> = merge(
    this.http.get<Employee[]>(this.apiUrlEmployee), this.stream$
  ).pipe(
    shareReplay(1),
    catchError(this.handleError('getEmployees', []))
  );

  getEmployees(): Observable<Employee[]> {
    console.log('Fetch employees');
    return this.employeesResponseGet$;
  }

  addEmployee(employee): Observable<any> {
    const httpOptions: Object = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'username': this.username,
          'password': this.password,
          'Authorization': 'Bearer ' + this.getToken()
        })
    };
    return this.http.post<Employee>(this.apiUrlEmployee, employee, httpOptions);
  }

  refreshUserToken() {
    const httpOptions: Object = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    };
    const body = {
      '_id': this._id,
      'username': this.username,
      'password': this.password,
      'newUsername': this.username,
      'newPassword': this.password,
    };
    return this.http.put<Employee>(this.apiUrlUser + this._id, body, httpOptions).toPromise();
  }

  setToken(token) {
    this.token = token.newToken;
  }

  getToken() {
    return this.token;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
