import { userLogin } from '../../fixtures/user.json';
import { postValid, postBlank, postUpdate } from '../../fixtures/post.json';

describe('CTAA Posters Module', () => {
    context("Creating Posters", () => {
        let token = "";
        beforeEach(() => {
            cy.loginUser(userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
        });
        it('POST /posters - Creating poster sucess', () => {
            cy.createPost(token, postValid).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('titulo', postValid.titulo);
                expect(response.body).to.have.property('texto', postValid.texto);
                expect(response.body.autor).to.have.property('email', userLogin.email);
                expect(response.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it('POST /posters - Creating poster with blanks fields', () => {
            cy.createPost(token, postBlank).then(response => {
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
            cy.loginUser(userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.getPosters().then(response => {
                id = response.body[0].id;
            });
        });

        it("PUT /posters/id - updating poster sucessful", () => {
            cy.updatePoster(id, token, postUpdate).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo', postUpdate.titulo);
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it("PUT /posters/id - updating poster not exists", () => {
            cy.updatePoster(0, token, postUpdate).then(res => {
                expect(res).to.have.property('status', 404);
                expect(res.body).to.have.property('erros');
                expect(res.body.erros).to.contains('Post não encontrado, tente novamente');
            });
        });
    });

    context("Recorvery all posters", () => {
        it("GET /posters - get all posters successful", () => {
            cy.getPosters().then(res => {
                expect(res).to.have.property('status', 200);
            });
        });
    });

    context("Recorvery one poster", () => {
        let token = "";
        let id = "";
        beforeEach(() => {
            cy.loginUser(userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.getPosters().then(response => {
                id = response.body[0].id;
            });
        });

        it("GET /posters/id - get poster by user successful", () => {
            cy.getPoster(id, token).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });

        it("GET /posts/id/details - get poster successful", () => {
            cy.getPosterDetails(id).then(res => {
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
            cy.loginUser(userLogin).then(response => {
                expect(response.status).to.eq(200);
                token = response.body;
            });
            cy.getPosters().then(response => {
                id = response.body[0].id;
            });
        });

        it("DELETE /posters/id - delete porter", () => {
            cy.deletePost(id, token).then(res => {
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('titulo');
                expect(res.body).to.have.property('texto');
                expect(res.body.autor).to.have.property('email', userLogin.email);
                expect(res.body.autor).to.have.property('name', userLogin.name);
            });
        });
    });
});