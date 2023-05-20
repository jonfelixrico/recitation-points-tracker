import SeatingArrangement from 'src/components/SeatingArrangement.vue'

describe('SeatingArrangement', () => {
  it('should have the correct seat count', () => {
    cy.mount(SeatingArrangement, {
      props: {
        columnCount: 5,
        rowCount: 5,
      },
    })

    cy.dataCy('seat').should('have.length', 25)
  })
})
