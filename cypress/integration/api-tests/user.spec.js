describe('CTAA api testing', () => {
    it('fetches users - GET', () => {
        cy.request('users/').as('userRequest');
        cy.get('@userRequest').then(users => {
            expect(users.status).to.eq(200);
            assert.isArray(users.body, []);
        });
    });
});