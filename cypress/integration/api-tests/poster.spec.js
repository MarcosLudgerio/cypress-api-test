import { userLogin } from '../../fixtures/user.json';
import { postValid, postBlank, postUpdate } from '../../fixtures/post.json';

describe('CTAA Posters Module', () => {
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

        it('POST /posts - Creating poster with blanks fields', () => {
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
        let id = ""
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.request('GET', '/posts').then(response => {
                id = response.body[0].id;
            });
        });

        it("PUT /post/id - updating poster sucessful", () => {
            cy.request({
                method: 'PUT',
                url: `posts/${id}`,
                failOnStatusCode: false,
                headers: { "Authorization": token },
                body: postUpdate
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo', postUpdate.titulo);
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it("PUT /post/id - updating poster not exists", () => {
            id = 0;
            cy.request({
                method: 'PUT',
                url: `posts/${id}`,
                failOnStatusCode: false,
                headers: { "Authorization": token },
                body: postUpdate
            }).then(res => {
                expect(res).to.have.property('status', 404);
                expect(res.body).to.have.property('erros');
                expect(res.body.erros).to.contains('Post não encontrado, tente novamente');
            });
        });
    });

    context("Recorvery all posters", () => {
        it("GET /posts - get all posters successful", () => {
            cy.request({
                method: 'GET',
                url: '/posts',
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);

            });
        });
    });

    context("Recorvery one poster", () => {
        let token = "";
        let id = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.request('GET', '/posts').then(response => {
                id = response.body[0].id;
            });
        });

        it("GET /posts/id - get poster by user successful", () => {
            cy.request({
                method: 'GET',
                url: `/posts/${id}`,
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it("GET /posts/id/details - get poster successful", () => {
            cy.request({
                method: 'GET',
                url: `/posts/${id}/details`,
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo');
                expect(res.body).to.have.property('texto');
            });
        });

        it("GET /posts/id/details - get poster successful", () => {
            cy.request({
                method: 'GET',
                url: `/posts/${id}/details`,
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo');
                expect(res.body).to.have.property('texto');
            });
        });
    });

    context("Delete poster", () => {
        let token = "";
        let id = "";
        beforeEach(() => {
            cy.request('POST', '/auth/login', userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.request('GET', '/posts').then(response => {
                id = response.body[0].id;
            });
        });

        it("DELETE /posts/id - delete porter", () => {
            cy.request({
                method: 'DELETE',
                url: `/posts/${id}`,
                headers: { "Authorization": token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo');
                expect(res.body).to.have.property('texto');
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });
    });
});