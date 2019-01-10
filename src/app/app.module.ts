import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDonutChartComponent } from './employee-donut-chart/employee-donut-chart.component';
import { EmployeeService } from './employee.service';

@NgModule({
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
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
