Cypress.Commands.add('createPost', (token, post) => {
    return cy.request({
        method: 'POST',
        url: '/posters',
        failOnStatusCode: false,
        headers: { "Authorization": token },
        body: post
    });
});

Cypress.Commands.add('getPosters', () => {
    return cy.request('GET', '/posters');
});

Cypress.Commands.add('updatePoster', (id, token, post) => {
    return cy.request({
        method: 'PUT',
        url: `posters/${id}`,
        failOnStatusCode: false,
        headers: { "Authorization": token },
        body: post
    });
});

Cypress.Commands.add('getPoster', (id, token, post) => {
    return cy.request({
        method: 'GET',
        url: `posters/${id}`,
        failOnStatusCode: false,
        headers: { "Authorization": token }
    });
});

Cypress.Commands.add('getPosterDetails', (id) => {
    return cy.request({
        method: 'GET',
        url: `posters/${id}/details`,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('deletePost', (id, token) => {
    return cy.request({
        method: 'DELETE',
        url: `/posters/${id}`,
        headers: { "Authorization": token },
        failOnStatusCode: false,
    });
});