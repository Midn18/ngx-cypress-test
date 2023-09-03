/// <reference types="cypress" />

const { first } = require('rxjs-compat/operator/first');

describe('My First Tests', () => {
  it('1 Test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    // by tag name
    cy.get('input');

    // by id
    cy.get('#inputEmail1');

    // by class name
    cy.get('.input-full-width');

    // by attribute name
    cy.get('[placeholder]');

    // by attribute name and value
    cy.get('[placeholder="Email"]');

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    // by two different attributes
    cy.get('[placeholder="Email"][fullwidth]');

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // by most recommended Cypress way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it('Second Test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]');
    cy.contains('Sign in');
    cy.contains('[status="warning"]', 'Sign in');

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .contains('Remember me')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
  });

  it('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      const emailLabel1 = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabel1 = firstForm.find('[for="inputPassword2"]').text();
      expect(emailLabel1).to.equal('Email');
      expect(passwordLabel1).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        const emailLabel2 = secondForm
          .find('[for="exampleInputEmail1"]')
          .text();
        const passwordLabel2 = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(emailLabel2).to.equal('Email address');
        expect(passwordLabel2).to.equal('Password');
        expect(passwordLabel1).to.equal(passwordLabel2);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password');
      });
    });
  });

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Email address');
      });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked');
  });

  it('Assert property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input)
          .invoke('prop', 'value')
          .should('contain', 'Aug 17, 2023');
      });
  });

  it('Radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should('be.checked');

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  });

  it('Check button', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    // cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
  });

  it('Date pickers', () => {
    function selectDayFromCurrent(incrementDay) {
      let date = new Date();
      date.setDate(date.getDate() + incrementDay);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('default', { month: 'short' });
      let dateAssert =
        futureMonth + ' ' + futureDay + ', ' + date.getFullYear();

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        var dateAssert = selectDayFromCurrent(2);

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
      });
  });

  it('Lists and dropdown', () => {
    cy.visit('/');
    // 1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should(
    // 'have.css',
    // 'background-color',
    // 'rgb(34, 43, 69)',
    // );

    //2
    cy.get('nav nb-select').then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-option').each((item, index) => {
        const itemText = item.text().trim();
        const colors = {
          Light: 'rgb(255, 255, 255)',
          Dark: 'rgb(34, 43, 69)',
          Cosmic: 'rgb(50, 50, 89)',
          Corporate: 'rgb(255, 255, 255)',
        };

        cy.wrap(item).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should(
          'have.css',
          'background-color',
          colors[itemText],
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it.only('Web tables', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    //1
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      });

    // 2
    cy.get('thead').find('.nb-plus').click();
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((addRow) => {
        cy.wrap(addRow).find('[placeholder="First Name"]').type('Eu');
        cy.wrap(addRow).find('[placeholder="Last Name"]').type('Tu');
        cy.wrap(addRow).find('.nb-checkmark').click();
      });
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColums) => {
        cy.wrap(tableColums).eq(2).should('contain', 'Eu');
        cy.wrap(tableColums).eq(3).should('contain', 'Tu');
      });

    // 3
    const age = [20, 30, 40, 66];

    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get('tbody tr').each((row) => {
        if (age == 66) {
          cy.wrap(row).should('contain', 'No data found');
        } else {
          cy.wrap(row).find('td').eq(6).should('contain', age);
        }
      });
    });
  });
});
