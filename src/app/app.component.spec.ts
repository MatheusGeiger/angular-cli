import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDonutChartComponent } from './employee-donut-chart/employee-donut-chart.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DescriptionPageComponent,
        EmployeeFormComponent,
        EmployeeListComponent,
        EmployeeDonutChartComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        HttpClientModule
      ],
      providers: [EmployeeService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
