When("I create a new user", () => {
    cy.createUser();
});

Then("the url should contains /users", () => {
    cy.url().should('contains', 'https://automacaocombatista.herokuapp.com/users');
});

And("the notice should have text Usuário Criado com sucesso", () => {
    cy.get('#notice').should('have.text', 'Usuário Criado com sucesso');
});