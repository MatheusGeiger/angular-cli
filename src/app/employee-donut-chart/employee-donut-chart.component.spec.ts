import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { EmployeeDonutChartComponent } from './employee-donut-chart.component';
import { EmployeeService } from '../employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployeeDonutChartComponent', () => {
  let component: EmployeeDonutChartComponent;
  let fixture: ComponentFixture<EmployeeDonutChartComponent>;
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
      declarations: [EmployeeDonutChartComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        HttpClientTestingModule
      ],
      providers: [EmployeeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(EmployeeService);
    httpMock = injector.get(HttpTestingController);
    fixture = TestBed.createComponent(EmployeeDonutChartComponent);
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
      expect(component.doughnutChartData).toEqual([employees[0].participation]);
      expect(component.doughnutChartLabels).toEqual([employees[0].firstName + ' ' + employees[0].lastName]);
    });

    it('Not success in api get', () => {
      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('failed'), { status: 500 });
      expect(component.doughnutChartData).toEqual([]);
      expect(component.doughnutChartLabels).toEqual([]);
    });
  });

  it('new employee in observable', () => {
    let spyreloadChart = spyOn(component, 'reloadChart');
    service.statusPostEmployee.next(employees[0]);
    expect(spyreloadChart).toHaveBeenCalled();
    expect(component.doughnutChartData).toEqual([employees[0].participation]);
    expect(component.doughnutChartLabels).toEqual([employees[0].firstName + ' ' + employees[0].lastName]);
  });

});
