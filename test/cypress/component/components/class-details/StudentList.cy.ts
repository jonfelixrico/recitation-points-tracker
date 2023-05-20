import StudentList from 'src/components/class-details/StudentList.vue'
import { StudentEntity } from 'src/models/entities'

describe('StudentList', () => {
  it('should show a list if there are students', () => {
    cy.mount(StudentList, {
      props: {
        students: [
          {
            id: 'test',
            firstName: 'First name',
            lastName: 'Last name',
            seatColumn: 1,
            seatRow: 1,
          },
        ] as StudentEntity[],
      },
    })

    cy.dataCy('empty-notice').should('not.exist')
    cy.dataCy('item').should('have.length', 1)
  })

  it('should show a notice if there are no students', () => {
    cy.mount(StudentList, {
      props: {
        students: [] as StudentEntity[],
      },
    })

    cy.dataCy('empty-notice').should('exist')
    cy.dataCy('item').should('not.exist')
  })

  it('should emit on click of the add students button', () => {
    const spy = cy.spy()
    cy.mount(StudentList, {
      props: {
        students: [] as StudentEntity[],
        onAddClick: spy,
      },
    })

    cy.dataCy('add-student-button')
      .click()
      .then(() => {
        expect(spy).to.have.been.called
      })
  })

  it("should emit on click of a student's delete button", () => {
    const spy = cy.spy()

    cy.mount(StudentList, {
      props: {
        students: [
          {
            id: 'test',
            firstName: 'First name',
            lastName: 'Last name',
            seatColumn: 1,
            seatRow: 1,
          },
        ] as StudentEntity[],
        onDelete: spy,
      },
    })

    cy.get('[data-student="test"]')
      .dataCy('delete-button')
      .click()
      .then(() => {
        cy.withinDialog({
          fn: (el) => {
            cy.wrap(el)
              .dataCy('ok-button')
              .click()
              .then(() => {
                expect(spy).to.have.been.called
              })
          },
        })
      })
  })
})
