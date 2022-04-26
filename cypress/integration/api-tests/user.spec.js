import faker from '@faker-js/faker';
import { userValid, userValid2, userLogin, userBlank, userInvalidEmailAndInvalidSite, userPasswordLassThenAllowed, userPasswordMostThenAllowed, userDuplicatedEmail } from '../../fixtures/user.json';

describe('CTAA Users Module', () => {
    context("Creating users", () => {
        it('POST /users - Creating user successful', () => {

            userValid.name = faker.name.firstName();
            userValid.lastname = faker.name.lastName();
            userValid.email = faker.internet.email();
            userValid.password = faker.internet.password();

            cy.createUser(userValid).then(response => {

                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('name', userValid.name);
                expect(response.body).to.have.property('lastname', userValid.lastname);
                expect(response.body).to.have.property('email', userValid.email);
            });
        });

        it('POST /users - Creating user with blank datas', () => {
            cy.createUser(userBlank).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('Campo nome é obrigatório');
                expect(res.body.erros).to.contains('Campo sobrenome é obrigatório');
                expect(res.body.erros).to.contains('Campo senha é obrigatório');
                expect(res.body.erros).to.contains('Campo email é obrigatório');
            });
        });

        it('POST /users - Creating user with invalid email address and site', () => {
            cy.createUser(userInvalidEmailAndInvalidSite).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('O E-mail precisa ser válido');
                expect(res.body.erros).to.contains('O site precisa ser válido');
            });
        });

        it('POST /users - Creating user with password less ', () => {
            cy.createUser(userPasswordLassThenAllowed).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('A senha deve ter entre 8 e 64 caracteres');
            });
        });

        it('POST /users - Creating user with password more', () => {
            cy.createUser(userPasswordMostThenAllowed).then(res => {
                expect(res).to.have.property('status', 400);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('A senha deve ter entre 8 e 64 caracteres');
            });
        });

        it('POST /users - Creating user with duplicated email address', () => {
            cy.createUser(userDuplicatedEmail).then(res => {
                expect(res).to.have.property('status', 409);
                expect(res.body).to.contains.property('erros');
                expect(res.body.erros).to.contains('Usuário com este email ja foi cadastrado');
            });
        });
    });

    context("Updating users", () => {
        let token = "";
        beforeEach(() => {
            cy.loginUser(userLogin).then(res => {
                token = res.body;
            });
        });

        it("PUT /users - updating user successful", () => {
            userLogin.name = faker.name.firstName();
            cy.updateUser(token, userLogin).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('name', userLogin.name);
            });
        });
    });

    context("Recorvery users", () => {
        let token = "";
        beforeEach(() => {
            cy.createUser(userValid2);
            cy.loginUser(userValid2).then(res => {
                token = res.body;
            });
        });

        it("GET /users - get all users successful", () => {
            cy.getUsers().then(res => {
                expect(res).to.have.property('status', 200);
            });
        });

        it.only("GET /users/details - get one user", () => {
            cy.getUserDetails(token).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body.name).to.equal(userValid2.name);
                expect(res.body.lastname).to.equal(userValid2.lastname);
                expect(res.body.email).to.equal(userValid2.email);
                expect(res.body.site).to.equal(userValid2.site);
            });
        });
    });
});