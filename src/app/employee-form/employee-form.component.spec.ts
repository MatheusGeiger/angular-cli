import { async, ComponentFixture, TestBed, tick, fakeAsync, getTestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from '../employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let injector;
  let service: EmployeeService;
  let httpMock: HttpTestingController;


  const valuesForm = {
    firstName: 'first name',
    lastName: 'last name',
    participation: 2,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [EmployeeService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#cleanForm', () => {
    component.submitted = true;
    component.attemptsToPostEmployees = 100;
    component.employeeForm.setValue(valuesForm);
    expect(component.employeeForm.value).toEqual(valuesForm);
    expect(component.submitted).toBeTruthy();
    expect(component.attemptsToPostEmployees).toEqual(100);
    component.cleanForm();
    expect(component.employeeForm.value).toEqual({
      firstName: '',
      lastName: '',
      participation: '',
    });
    expect(component.submitted).toBeFalsy();
    expect(component.attemptsToPostEmployees).toEqual(1);
  })

  it("#hideMessage", fakeAsync(() => {
    component.errorSubmited = true;
    component.successSubmited = true;
    component.hideMessage();
    tick(7000);
    expect(component.errorSubmited).toBeFalsy();
    expect(component.successSubmited).toBeFalsy();
  }));

  it("#showSeveralErrorsAlertAndClearTentatives", fakeAsync(() => {
    component.attemptsToPostEmployees = 2;
    component.severalErrorSubmited = false;
    component.showSeveralErrorsAlertAndClearTentatives();
    tick(1000);
    expect(component.attemptsToPostEmployees).toEqual(1);
    expect(component.severalErrorSubmited).toBeTruthy();
    tick(6000);
    expect(component.severalErrorSubmited).toBeFalsy();
  }));

  it("#emmitEventPostEmployee", () => {
    injector = getTestBed();
    service = injector.get(EmployeeService);
    component.emmitEventPostEmployee(valuesForm);
    service.newPostEmployee.subscribe(newEmployee => {
      expect(newEmployee).toEqual(valuesForm);
    });
  });

  describe('#onSubmit', () => {
    it("Invalid Form", () => {
      expect(component.onSubmit()).toBeUndefined;
    });

    it("Valid Form", () => {
      component.employeeForm.setValue(valuesForm);
      let spyPostEmployee = spyOn(component, "postEmployee");
      component.onSubmit();
      expect(spyPostEmployee).toHaveBeenCalled();
    });
  });

  describe('#postEmployee', () => {
    it("Valid Success in API", () => {
      injector = getTestBed();
      service = injector.get(EmployeeService);
      httpMock = injector.get(HttpTestingController);
      let spyhideMessage = spyOn(component, "hideMessage");
      let spycleanForm = spyOn(component, "cleanForm");

      component.employeeForm.setValue(valuesForm);
      component.postEmployee();

      const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
      expect(req.request.method).toBe('POST');
      req.flush([{ any: 'way' }]);

      service.newPostEmployee.subscribe(newEmployee => {
        expect(newEmployee).toEqual(valuesForm);
      });

      expect(component.successSubmited).toBeTruthy();
      expect(spyhideMessage).toHaveBeenCalled();
      expect(spycleanForm).toHaveBeenCalled();
    });
  });

  describe('#postEmployee API - Requests', () => {

    let arrayStatus = [401, 403]

    for (let index = 0; index < arrayStatus.length; index++) {
      const statusError = arrayStatus[index];

      it("Invalid Success in API - status" + statusError, () => {
        injector = getTestBed();
        service = injector.get(EmployeeService);
        httpMock = injector.get(HttpTestingController);

        component.employeeForm.setValue(valuesForm);
        component.postEmployee();

        const req = httpMock.expectOne(`http://localhost:3001/api/employees/`);
        expect(req.request.method).toBe('POST');
        req.error(new ErrorEvent('token failed authorization'), { status: statusError });
      });
    };
  });
});
