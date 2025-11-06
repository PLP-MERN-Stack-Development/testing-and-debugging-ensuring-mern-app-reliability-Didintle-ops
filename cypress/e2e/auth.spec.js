// cypress/e2e/auth.spec.js
describe('Auth flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('allows registration and login', () => {
    cy.visit('/register');
    cy.get('input[name="username"]').type('e2euser');
    cy.get('input[name="email"]').type('e2e@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    // After registering might redirect to login or auto-login
    cy.url().should('not.include', '/register');

    // Try login
    cy.visit('/login');
    cy.get('input[name="email"]').type('e2e@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    // Verify logged in state (e.g. presence of logout button)
    cy.contains('Logout').should('be.visible');
  });
});
