import SeatingArrangement from 'src/components/seating/SeatingArrangement.vue'

describe('SeatingArrangement', () => {
  it('should have the correct arrangement displayed', () => {
    cy.mount(SeatingArrangement, {
      props: {
        arrangement: [7, 7, 7, 7, 8, 8],
      },
    })

    cy.dataCy('seat').should('have.length', 44)
    cy.dataCy('column').should('have.length', 6)
  })
})
