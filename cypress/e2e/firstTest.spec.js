/// <reference types="cypress" />

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

  it.only('Second Test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]');
    cy.contains('Sign in');
    cy.contains('[status="warning"]', 'Sign in');
  });
});
