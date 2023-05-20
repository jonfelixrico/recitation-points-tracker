import SeatingArrangement from 'src/components/seating/SeatingArrangement.vue'
import { SeatOccupant } from 'src/components/seating/seating-types'

describe('SeatingArrangement', () => {
  it('should have the correct arrangement displayed', () => {
    cy.mount(SeatingArrangement, {
      props: {
        arrangement: [7, 7, 7, 7, 8, 8],
        occupants: [
          {
            id: 'test',
            colNo: 5,
            rowNo: 6,
          },
        ] as SeatOccupant[],
      },
    })

    cy.dataCy('seat').should('have.length', 44)
    cy.get('[data-empty-seat]').should('have.length', 43)
    cy.get('[data-occupant-id="test"][col-no="5"][row-no="6"]').should('exist')
  })
})
