Cypress.Commands.add('login', user => {
    return cy.request({
        method: 'POST',
        url: '/auth/login',
        failOnStatusCode: false,
        body: user
    });
});