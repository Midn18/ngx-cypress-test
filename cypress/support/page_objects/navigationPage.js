export class NavigationPage {
  formsLayoutsPage() {
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
  }

  datepickerPage() {
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();
  }
}

export const navigateTo = new NavigationPage();
