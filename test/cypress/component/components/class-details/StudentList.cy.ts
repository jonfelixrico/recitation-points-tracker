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

    cy.dataCy('student-content').should('exist')
    cy.dataCy('empty-notice').should('not.exist')
  })

  it('should show a notice if there are no students', () => {
    cy.mount(StudentList, {
      props: {
        students: [] as StudentEntity[],
      },
    })

    cy.dataCy('empty-notice').should('exist')
    cy.dataCy('student-content').should('not.exist')
  })
})
