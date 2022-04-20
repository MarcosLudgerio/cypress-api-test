import faker from '@faker-js/faker';

let userData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

describe('CTAA api testing', () => {
    it.only('POST /users', () => {
        cy.request('POST', '/users', userData).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', userData.name);
            expect(response.body).to.have.property('email', userData.email);
        });
    });
});