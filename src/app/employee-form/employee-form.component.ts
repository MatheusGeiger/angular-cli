import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent implements OnInit {

    employeeForm: FormGroup;
    submitted = false;
    successSubmited = false;
    errorSubmited = false;
    severalErrorSubmited = false;
    attemptsToPostEmployees = 1;

    constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

    get form() { return this.employeeForm.controls; }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            participation: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        });
    }

    cleanForm() {
        this.employeeForm.setValue({
            firstName: '',
            lastName: '',
            participation: '',
        });
        this.submitted = false;
        this.attemptsToPostEmployees = 1;
    }

    hideMessage() {
        setTimeout(() => {
            this.errorSubmited = false;
            this.successSubmited = false;
        }, 5000);
    }

    showSeveralErrorsAlertAndClearTentatives() {
        setTimeout(() => {
            this.attemptsToPostEmployees = 1;
            this.severalErrorSubmited = true;
        }, 1000);
        setTimeout(() => {
            this.severalErrorSubmited = false;
        }, 6000);
    }

    async postEmployee() {
        await this.employeeService.addEmployee(this.employeeForm.value)
            .subscribe(res => {
                this.submitted = false;
                this.errorSubmited = false;
                this.successSubmited = true;
                this.emmitEventPostEmployee(this.employeeForm.value);
                this.cleanForm();
                this.hideMessage();
            }, (err) => {
                if (err.status === 401 || err.status === 400) {
                    if (this.attemptsToPostEmployees < 3) {
                        setTimeout(() => {
                            this.employeeService.refreshUserToken().then(
                                result => {
                                    this.employeeService.setToken(result);
                                }
                            );
                            this.postEmployee();
                            this.attemptsToPostEmployees++;
                        }, 2000);
                    }
                }
                this.submitted = false;
                this.successSubmited = false;
                this.errorSubmited = true;
                this.attemptsToPostEmployees === 3 ? this.showSeveralErrorsAlertAndClearTentatives() :
                    this.hideMessage();
            });

    }

    emmitEventPostEmployee(employee): any {
        this.employeeService.statusPostEmployee.next(employee);
    }

    onSubmit() {
        this.submitted = true;

        if (this.employeeForm.invalid) {
            return;
        } else {
            console.log(JSON.stringify(this.employeeForm.value));
            this.postEmployee();
        }


    }
}
