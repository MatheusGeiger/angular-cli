import { EmployeeService } from './employee.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee } from './employee';

describe('EmployeeService', () => {
  let injector;
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EmployeeService
      ]
    });
    injector = getTestBed();
    service = injector.get(EmployeeService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });

  describe('GET Employees', () => {
    it('should return an Observable<Employee[]>', () => {
      const Employees: Employee[] = [
        {
          firstName: 'matheus',
          lastName: 'geiger',
          participation: 1
        },
        {
          firstName: 'matheus',
          lastName: 'geiger',
          participation: 2
        },
      ];

      service.getEmployees().subscribe(employees => {
        expect(employees.length).toBe(2);
        expect(employees).toEqual(Employees);
      });

      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('GET');
      req.flush(Employees);
    });
  });

  describe('POST Employees', () => {
    it('should return an Observable<Employee[]>', () => {
      const Employee = {
        firstName: 'matheus',
        lastName: 'geiger',
        participation: 1
      };

      service.addEmployee(Employee).subscribe(employee => {
        expect(employee).toEqual(Employee)
      });

      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(Employee);
      req.flush(Employee);
    });
  });

  describe('Refresh Token', () => {
    it('should change token state', () => {

      const RefreshUserReturned = {
        _id: '5c31076471b3ba004f7811bd',
        username: 'matheus',
        password: '1234',
        newUsername: 'matheus',
        newPassword: '1234'
      };

      service.refreshUserToken().then(
        result => { }
      );

      const req = httpMock.expectOne(`http://localhost:3001/api/users/5c31076471b3ba004f7811bd`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(RefreshUserReturned);
    });
  });

  describe('set Token', () => {
    it('should set token state then see result', () => {

      const token = {
        newToken: 'newToken'
      };

      service.setToken(token);

      expect(service.getToken()).toEqual(token.newToken);
    });
  });
});
