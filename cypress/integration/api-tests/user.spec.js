import faker from '@faker-js/faker';
import { userValid, userLogin, userBlank, userInvalidEmail, userPasswordLassThenAllowed, userPasswordMostThenAllowed, userDuplicatedEmail } from '../../fixtures/user.json';

describe('CTAA api testing', () => {
    context("Creating users", () => {
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

        it('POST /users - Creating user with blank datas', () => {
            cy.request({
                method: 'POST',
                url: '/users',
                failOnStatusCode: false,
                body: userBlank
            }).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('Campo nome é obrigatório');
                expect(res.body.erros).to.contains('Campo senha é obrigatório');
                expect(res.body.erros).to.contains('Campo email é obrigatório');
            });
        });

        it('POST /users - Creating user with invalid email address', () => {
            cy.request({
                method: 'POST',
                url: '/users',
                failOnStatusCode: false,
                body: userInvalidEmail
            }).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('Email inválido');
            });
        });

        it('POST /users - Creating user with password less ', () => {
            cy.request({
                method: 'POST',
                url: '/users',
                failOnStatusCode: false,
                body: userPasswordLassThenAllowed
            }).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('A senha deve ter entre 8 e 64 caracteres');
            });
        });

        it('POST /users - Creating user with password more', () => {
            cy.request({
                method: 'POST',
                url: '/users',
                failOnStatusCode: false,
                body: userPasswordMostThenAllowed
            }).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('A senha deve ter entre 8 e 64 caracteres');
            });
        });

        it('POST /users - Creating user with duplicated email address', () => {
            cy.request({
                method: 'POST',
                url: '/users',
                failOnStatusCode: false,
                body: userDuplicatedEmail
            }).then(res => {
                expect(res).to.have.property('status', 409);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('Usuário com este email ja foi cadastrado');
            });
        });
    });

    context("Updating users", () => {
        let token = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
        });

        it("PUT /users - updating user sucessful", () => {
            userLogin.name = faker.fake.name;
            cy.request({
                method: 'PUT',
                url: '/users',
                failOnStatusCode: false,
                headers: { "Authorization": token },
                body: userLogin
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('name', userLogin.name);
            });
        });
    });

    context("Recorvery users", () => {
        let token = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
        });

        it("GET /users - get all users sucessful", () => {
            cy.request({
                method: 'GET',
                url: '/users',
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);

            });
        });

        it.only("GET /users/details - get one user", () => {
            cy.request({
                method: 'GET',
                url: '/users/details',
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                console.log(res.body);
                expect(res).to.have.property('status', 200);
                expect(res.body.name).to.equal(userLogin.name);
                expect(res.body.email).to.equal(userLogin.email);
            });
        });
    });
});