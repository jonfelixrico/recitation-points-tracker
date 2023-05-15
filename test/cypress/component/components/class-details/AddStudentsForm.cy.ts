import AddStudentsInput from 'src/components/class-details/AddStudentsInput.vue'
import { StudentEntity } from 'src/models/entities'

describe('AddStudentsInput', () => {
  it('should display data in the model - empty', () => {
    cy.mount(AddStudentsInput, {
      props: {
        modelValue: [] as Omit<StudentEntity, 'id'>[],
      },
    })

    cy.dataCy('student').should('not.exist')
  })

  it('should display data in the model - populated', () => {
    cy.mount(AddStudentsInput, {
      props: {
        modelValue: [
          {
            firstName: 'Student',
            lastName: 'Student 1',
            seatColumn: 1,
            seatRow: 1,
          },
          {
            firstName: 'Student',
            lastName: 'Student 2',
            seatColumn: 1,
            seatRow: 1,
          },
        ] as Omit<StudentEntity, 'id'>[],
      },
    })

    cy.dataCy('student').should('have.length', 2)
  })
})
