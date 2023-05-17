/// <reference types="cypress" />
export {};
import 'cypress-file-upload';

Cypress.Commands.add('promo_login', (email, password) => {
  cy.visit('/').then(() => {
    cy.fixture('auth').then((data) => {
      cy.get(`${data.path.login.emailField} input`).type(email);
      cy.get(`${data.path.login.passwordField} input`).type(password);
      cy.get(`${data.path.login.submitBtn} button`).click();
    })
  });
})

Cypress.Commands.add('promo_logout', () => {
  cy.fixture('auth').then((data) => cy.get(data.path.profile.sideNav.logout).click());
})


declare global {
  namespace Cypress {
    interface Chainable {
      promo_login(email: string, password: string): Chainable
      promo_logout(): Chainable
    }
  }
}

