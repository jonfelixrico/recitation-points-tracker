describe('login', () => {
  it('should log in', () => {
    cy.visit('/')
    cy.dataCy('username').type('user1@jrico.dev')
    cy.dataCy('password').type('p@ssw0rd')
    cy.dataCy('submit')
      .click()
      .then(() => {
        cy.location().should((location) => {
          expect(location.pathname).does.not.contain('login')
        })
      })
  })

  it('should prevent unauthenticated access', () => {
    cy.visit('/classes').then(() => {
      cy.location().should((location) => {
        expect(location.pathname).contain('login')
      })
    })
  })
})
