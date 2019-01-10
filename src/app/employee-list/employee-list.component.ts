import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        if (res.length >= 1) {
          this.employees = res;
        }
      });
  }

  ngOnInit() {
    this.getEmployees();
    this.employeeService.newPostEmployee.subscribe(newEmployee => {
      if (newEmployee != null) {
        this.employees.push(newEmployee);
      }
    });
  }
}
