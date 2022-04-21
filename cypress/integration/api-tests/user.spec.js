import faker from '@faker-js/faker';
import { userValid, userWithoutName } from '../../fixtures/user.json';

describe('CTAA api testing', () => {
    it('POST /users - Creating user sucess', () => {

        userValid.name = faker.fake.name;
        userValid.email = faker.internet.email();
        userValid.password = faker.internet.password();

        cy.request('POST', '/users', userValid).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', userValid.name);
            expect(response.body).to.have.property('email', userValid.email);
        });
    });

    it.only('POST /users - Creating user without name', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            failOnStatusCode: false,
            body: userWithoutName
        }).then(res => {
            expect(res).to.have.property('status', 400);
            expect(res.body).to.contains.property('erros');
            expect(res.body.erros).to.contains('Campo nome é obrigatório');
        });
    });
});