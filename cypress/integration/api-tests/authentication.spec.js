const { userLogin } = Cypress.env();

describe('CTAA api testing', () => {
    it('POST /auth/login - Login sucessfully', () => {
        console.log(userLogin);
        cy.request('POST', '/auth/login', userLogin).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('POST /auth/login - Login with password invalid', () => {
        userLogin.password = "123456";
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            body: userLogin
        }).then(response => {
            expect(response.status).to.eq(401);
            expect(response.body).to.contains.property('erros');
            expect(response.body.erros).to.contains('Falha ao tentar efetuar o login, verifique os dados e tente novamente');
        });
    });

    it('POST /auth/login - Login with email not valid', () => {
        userLogin.email = "notvalid";
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            body: userLogin
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body).to.contains.property('erros');
            expect(response.body.erros).to.contains('O email precisa ser válido');
        });
    });

    it('POST /auth/login - Login with null fields', () => {
        userLogin.email = "";
        userLogin.password = "";
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            body: userLogin
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body).to.contains.property('erros');
            expect(response.body.erros).to.contains('Campo email é obrigatório');
            expect(response.body.erros).to.contains('Campo senha é obrigatório');
        });
    });
});