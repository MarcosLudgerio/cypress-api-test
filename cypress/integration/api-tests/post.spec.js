import faker from '@faker-js/faker';
import { userLogin } from '../../fixtures/user.json';
import { postValid, postBlank } from '../../fixtures/post.json';

describe('CTAA Posts Module', () => {
    context("Creating Posters", () => {
        let token = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
        });
        it('POST /posts - Creating poster sucess', () => {
            cy.request({
                method: 'POST',
                url: '/posts',
                failOnStatusCode: false,
                headers: { "Authorization": token },
                body: postValid
            }).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('titulo', postValid.titulo);
                expect(response.body).to.have.property('texto', postValid.texto);
                expect(response.body.autor).to.have.property('email', userLogin.email);
                expect(response.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it.only('POST /posts - Creating poster with blanks fields', () => {
            cy.request({
                method: 'POST',
                url: '/posts',
                failOnStatusCode: false,
                headers: { "Authorization": token },
                body: postBlank
            }).then(response => {
                expect(response).to.have.property('status', 400);
                expect(response.body).to.contains.property('erros');
                expect(response.body.erros).to.contains('Campo título do post é obrigatório');
                expect(response.body.erros).to.contains('Campo texto é obrigatório');
            });
        });
    });

    context("Updating posters", () => {
        let token = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
        });

        it("PUT /users - updating poster sucessful", () => {
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

        it("GET /users/details - get one user", () => {
            cy.request({
                method: 'GET',
                url: '/users/details',
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body.name).to.equal(userValid.name);
                expect(res.body.lastname).to.equal(userValid.lastname);
                expect(res.body.email).to.equal(userValid.email);
                expect(res.body.site).to.equal(userValid.site);
            });
        });
    });
});