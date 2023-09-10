import { onDatePickerPage } from '../support/page_objects/datePickerPage';
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage';
import { navigateTo } from '../support/page_objects/navigationPage';
import { onSmartDataTablePage } from '../support/page_objects/smartDataTablePage';

describe('Test with spec objects', () => {
  beforeEach('open application', () => {
    cy.openHomePage();
  });

  it('Verify navigation between the pages', () => {
    navigateTo.formsLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
    navigateTo.dialogPage();
  });

  it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formsLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      'John',
      'Lenon@gmail.com',
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('A', 'aaaaaaa');
    navigateTo.datepickerPage();
    onDatePickerPage.selectCommonDatePickerDateFromToday(1);
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);

    navigateTo.smartTablePage();
    onSmartDataTablePage.addNewRecordWithFirstAndLastName('John', 'Lenon');
    onSmartDataTablePage.updateAgeByFirstName('John', '35');
    onSmartDataTablePage.deleteRowByIndex(1);
  });
});
