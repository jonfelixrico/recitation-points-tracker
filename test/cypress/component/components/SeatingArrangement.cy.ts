import SeatingArrangement from 'src/components/SeatingArrangement.vue'

describe('SeatingArrangement', () => {
  it('should have the correct arrangement displayed', () => {
    cy.mount(SeatingArrangement, {
      props: {
        columnCount: 8,
        rowCount: 5,
      },
    })

    cy.dataCy('seat').should('have.length', 40)
    cy.dataCy('column').should('have.length', 8)
  })
})
