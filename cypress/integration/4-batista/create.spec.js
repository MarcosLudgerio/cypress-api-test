describe('Test login sucess PMO', () => {
    before(() => {
        cy.visit('/new');
    });

    it('Create user sucess', () => {
        cy.createUser();

        cy.url().should('contains', 'https://automacaocombatista.herokuapp.com/users');

        cy.get('#notice').should('have.text', 'Usuário Criado com sucesso');
    });

});