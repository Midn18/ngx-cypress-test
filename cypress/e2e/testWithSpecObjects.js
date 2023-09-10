import { navigateTo } from '../support/page_objects/navigationPage';

describe('Test with spec objects', () => {
  beforeEach('open application', () => {
    cy.visit('/');
  });

  it('Verify navigation between the pages', () => {
    navigateTo.formsLayoutsPage();
    navigateTo.datepickerPage();
  });
});
