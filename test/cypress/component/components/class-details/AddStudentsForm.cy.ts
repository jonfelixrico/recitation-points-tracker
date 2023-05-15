import AddStudentsForm from 'src/components/class-details/AddStudentsForm.vue'
import { StudentEntity } from 'src/models/entities'

describe('AddStudentsForm', () => {
  it('should display data in the model - empty', () => {
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [] as Omit<StudentEntity, 'id'>[],
      },
    })

    cy.dataCy('student').should('not.exist')
  })

  it('should display data in the model - populated', () => {
    cy.mount(AddStudentsForm, {
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

  it('should have an input', () => {
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [] as Omit<StudentEntity, 'id'>[],
      },
    })

    cy.dataCy('input').should('exist')
  })
})
