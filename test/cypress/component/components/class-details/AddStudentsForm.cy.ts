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
    cy.dataCy('empty').should('exist')
  })

  it('should display data in the model - populated', () => {
    const studentsArr: Omit<StudentEntity, 'id'>[] = Array.from(
      { length: 10 },
      (_, index) => {
        return {
          firstName: `FN ${index}`,
          lastName: `LN ${index}`,
          seatColumn: 0,
          seatRow: 0,
        }
      }
    )
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: studentsArr,
      },
    })

    cy.dataCy('student').should('have.length', 10)
    cy.dataCy('empty').should('not.exist')
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

describe('AddStudentsForm -- input', () => {
  it('should should not accept empty inputs', () => {
    const spy = cy.spy()
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [] as Omit<StudentEntity, 'id'>[],
        'onUpdate:modelValue': spy,
      },
    })

    cy.dataCy('input').dataCy('first-name').clear()
    cy.dataCy('input').dataCy('last-name').clear()
    cy.dataCy('input')
      .dataCy('submit')
      .click()
      .then(() => {
        expect(spy).not.to.have.been.called
      })
  })

  it('should should accept valid inputs', () => {
    const spy = cy.spy()
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [] as Omit<StudentEntity, 'id'>[],
        'onUpdate:modelValue': spy,
      },
    })

    cy.dataCy('input').dataCy('first-name').type('First name')
    cy.dataCy('input').dataCy('last-name').type('Last name')

    cy.dataCy('input')
      .dataCy('submit')
      .click()
      .then(() => {
        expect(spy).to.have.been.called
      })

    cy.dataCy('input').dataCy('first-name').should('be.empty')
    cy.dataCy('input').dataCy('last-name').should('be.empty')
  })
})
