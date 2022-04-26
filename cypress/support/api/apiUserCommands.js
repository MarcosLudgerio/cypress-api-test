Cypress.Commands.add('loginUser', (user) => {
    return cy.request('POST', '/auth/login', user);
});

Cypress.Commands.add('createUser', (user) => {
    return cy.request({
        method: 'POST',
        url: '/users',
        failOnStatusCode: false,
        body: user
    });
});

Cypress.Commands.add('updateUser', (token, user) => {
    return cy.request({
        method: 'PUT',
        url: '/users',
        failOnStatusCode: false,
        headers: { "Authorization": token },
        body: user
    });
});

Cypress.Commands.add('getUsers', () => {
    return cy.request({
        method: 'GET',
        url: '/users',
        failOnStatusCode: false,
    });
});

Cypress.Commands.add('getUserDetails', (token) => {
    return cy.request({
        method: 'GET',
        url: '/users/details',
        headers: { "Authorization": token },
        failOnStatusCode: false,
    });
});