import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let injector;
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const employees = [{
    firstName: 'first name',
    lastName: 'last name',
    participation: 2,
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [EmployeeService],
      imports: [
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(EmployeeService);
    httpMock = injector.get(HttpTestingController);

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getEmployees', () => {
    it('Success in api get', () => {
      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('GET');
      req.flush(employees);
      expect(component.employees).toEqual(employees);
    });

    it('Not success in api get', () => {
      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('failed'), { status: 500 });
      expect(component.employees).toEqual([]);
    });
  });

  it('new employee in observable', () => {
    service.statusPostEmployee.next(employees[0]);
    expect(component.employees).toEqual(employees);
  });
});
