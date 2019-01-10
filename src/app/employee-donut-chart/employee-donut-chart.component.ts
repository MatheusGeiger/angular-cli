import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-employee-donut-chart',
  templateUrl: './employee-donut-chart.component.html',
  styleUrls: ['./employee-donut-chart.component.scss']
})

export class EmployeeDonutChartComponent implements OnInit {

  @ViewChild('chart') chart: BaseChartDirective;

  employees: Employee[];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions: object = {
    legend: {
      position: 'right',
      labels: {
        fontSize: 14
      }
    }
  };

  constructor(private employeeService: EmployeeService) { }

  reloadChart() {
    if (this.chart !== undefined) {
      this.chart.chart.destroy();
      this.chart.chart = 0;
      this.chart.data = this.doughnutChartData;
      this.chart.labels = this.doughnutChartLabels;
      this.chart.options = this.doughnutChartOptions;
      this.chart.ngOnInit();
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        if (res.length >= 1) {
          this.employees = res;
          this.employees.forEach(employee => {
            this.doughnutChartLabels.push(employee.firstName + ' ' + employee.lastName);
            this.doughnutChartData.push(employee.participation);
          });
        }
      });
  }

  ngOnInit() {
    this.getEmployees();
    this.employeeService.newPostEmployee.subscribe(newEmployee => {
      if (newEmployee != null) {
        this.doughnutChartLabels.push(newEmployee.firstName  + ' ' + newEmployee.lastName);
        this.doughnutChartData.push(newEmployee.participation);
        this.reloadChart();
      }
    });
  }
}
