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

  it.only('Assert property', () => {
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
});
