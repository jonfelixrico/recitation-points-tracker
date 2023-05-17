import AddStudentsForm from 'src/components/class-details/AddStudentsForm.vue'

describe('AddStudentsForm - items', () => {
  it('should display data in the model - empty', () => {
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [],
      },
    })

    cy.dataCy('student').should('not.exist')
    cy.dataCy('empty').should('exist')
  })

  it('should display data in the model - populated', () => {
    const studentsArr = Array.from({ length: 10 }, (_, index) => {
      return {
        firstName: `FN ${index}`,
        lastName: `LN ${index}`,
      }
    })
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: studentsArr,
      },
    })

    cy.dataCy('student').should('have.length', 10)
    cy.dataCy('empty').should('not.exist')
  })
})

describe('AddStudentsForm - input', () => {
  it('should exist', () => {
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [],
      },
    })

    cy.dataCy('input').should('exist')
  })

  it('should should not accept empty inputs', () => {
    const spy = cy.spy()
    cy.mount(AddStudentsForm, {
      props: {
        modelValue: [],
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
        modelValue: [],
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
