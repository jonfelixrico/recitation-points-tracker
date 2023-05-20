import SeatingArrangement from 'src/components/SeatingArrangement.vue'

describe('SeatingArrangement', () => {
  it('should have the correct seat count', () => {
    cy.mount(SeatingArrangement, {
      props: {
        columns: 5,
        row: 5,
      },
    })

    cy.dataCy('seat').should('have.length', 25)
  })
})
