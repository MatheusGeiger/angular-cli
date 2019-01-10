import { browser, by, element } from 'protractor';

export class AppPage {

  getBrowser(){
    return browser;
  }
  
  navigateTo() {
    return browser.get('/');
  }
  
  // Form component functions
  getFormComponent() {
    return element(by.id('form-employee'));
  }

  getFirstNameField(){
    return element(by.id('firstName-input'));
  }

  getLastNameField(){
    return element(by.id('lastName-input'));
  }

  getParticipationField(){
    return element(by.id('participation-input'));
  }

  getBtnSend(){
    return element(by.id('button-send-form'));
  }

  // Description Page component functions
  getDescriptionPageComponent() {
    return element(by.id('description-page'));
  }
  
  // Table component functions
  getTableComponent() {
    return element(by.id('list-employee'));
  }
  
  // Donut component functions
  getDonutComponent() {
    return element(by.id('donut-chart'));
  }
}
