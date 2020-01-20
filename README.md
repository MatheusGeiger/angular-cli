
# Client view responsible to show employees list and chart from values provided from api

## OPERATION

This client viewer has been developed using angular framework, divided in four components:
- employee-form: Component responsible from add new employee
- employee-list: Component responsible to show employees table
- employee-donut-chart: Component responsible to show employees chart
- description-page: Component responsible to show description page

![Responsive Page](/docs/images/responsiveAngularCli.png "Responsive Page")

### NEW EMPLOYEE

To create new employee you need to fill three fields from form.
- First Name: this field is required and has type string, can you input the first name from employee
- Last Name: this field is required and has type string, can you input the last name from employee
- Participation: this field is required and has type number between 1 and 100, can you input the participation from employee

On click in send button the application tries three times to send the data to the API. You can see the process in alert on rigth from page.

![Responsive Page](/docs/images/createUser.gif "Responsive Page")

# ANGULAR CLIENT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## DEVELOPMENT SERVER

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## CODE STYLE

To validate syntax and correctly spacement or other abnormalities from code writer use `ng run lint` 

## UNIT TESTS

Run `ng test` to execute the unit tests via Karma.

Run `ng test --no-watch --code-coverage` to execute the unit tests via Karma with Coverage.

## RUNNING END TO END tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## RUNNING TASK TO VALIDATE CODE

Run `npm validate-project`. This task run unit tests, lint and e2e tests.
