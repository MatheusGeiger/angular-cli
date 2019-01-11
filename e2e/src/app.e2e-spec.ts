import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('Form Component', () => {
    it('should has form component', () => {
      page.navigateTo();
      expect(page.getFormComponent()).toBeTruthy();
    });

    it('should has FirstName field', () => {
      page.navigateTo();
      expect(page.getFirstNameField()).toBeTruthy();
    });

    it('should has LastName field', () => {
      page.navigateTo();
      expect(page.getLastNameField()).toBeTruthy();
    });

    it('should has Participation field', () => {
      page.navigateTo();
      expect(page.getParticipationField()).toBeTruthy();
    });

    it('should has Send Button field', () => {
      page.navigateTo();
      expect(page.getBtnSend()).toBeTruthy();
    });

    it('should has values in all fields then button is enable', () => {
      page.navigateTo();
      page.getFirstNameField().sendKeys('first name');
      page.getLastNameField().sendKeys('last name');
      page.getParticipationField().sendKeys(2);
      expect(page.getBtnSend().isEnabled()).toBeTruthy();
    });

    it('should has values in two fields then button is disable', () => {
      page.navigateTo();
      page.getFirstNameField().sendKeys('first name');
      page.getLastNameField().sendKeys('last name');
      expect(page.getBtnSend().isEnabled()).toBeFalsy();
    });

    it('should has values in two fields and invalid participation value then button is disable', () => {
      page.navigateTo();
      page.getFirstNameField().sendKeys('first name');
      page.getLastNameField().sendKeys('last name');
      page.getParticipationField().sendKeys(120);
      expect(page.getBtnSend().isEnabled()).toBeFalsy();
    });

  });

  describe('Description Page Component', () => {
    it('should has description page component', () => {
      page.navigateTo();
      expect(page.getDescriptionPageComponent()).toBeTruthy();
    });
  });

  describe('Table Component', () => {
    it('should has table component', () => {
      page.navigateTo();
      expect(page.getTableComponent()).toBeTruthy();
    });
  });

  describe('Doughnut Component', () => {
    it('should has doughnut chart component', () => {
      page.navigateTo();
      expect(page.getDonutComponent()).toBeTruthy();
    });
  });

});
